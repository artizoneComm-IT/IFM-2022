import { Body, Controller, Delete, Get, NotAcceptableException, 
    Param, Patch, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { AssociationsService } from './associations.service';
import { CreateAssociationsDto, NomAssociationDto, ParamAssociationsDto, 
    ParamRemoveAssociationsDto, 
    UpdateAssociationPasswordDto, UpdateAssociationsDto } from './dto/associations.dto';

@ApiBearerAuth()
@Controller('associations')
export class AssociationsController {
    constructor(
        private associationsService: AssociationsService
    ) {}
    
    @UseGuards(AuthGuard('jwtZarao'))
    @Post('create')
    async createAssociations(@Body() donnees: CreateAssociationsDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.create(donnees, parseInt(req.user.id));
    }

    @Get('all')
    async findallAssociations() {
        return await this.associationsService.findall();
    }

    @Get(':id')
    async findAssociations(@Param() donnees: ParamAssociationsDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.findone(donnees);
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Get('')
    async findAssociationsByUserId(@Request() req: any) {
        return await this.associationsService.findallByUserId(parseInt(req.user.id));
    }

    @Get('nom/:nom')
    async findAssociationBy(@Param() donnees: NomAssociationDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.findallByNomAssociation(donnees);
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Put('update')
    async updateAssociations(@Body() donnees: UpdateAssociationsDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.update(donnees, parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Patch('update-password')
    async updateAssociationsPassword(donnees: UpdateAssociationPasswordDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.updatePassword(donnees, parseInt(req.user.id));
    }

    @Delete('delete/:id')
    async removeAssociations(@Param() donnees: ParamRemoveAssociationsDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.remove(donnees, parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Patch('update-photo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/associations_photo/",
            filename: (req, file, cb): void => {
                const name: string = file.originalname.split('.')[0];
                const tmp: Array<string> =  file.originalname.split('.');
                const fileExtension: string = tmp[tmp.length - 1];
                const newFilename: string = name.split(' ').join('_') 
                    + '_' + Date.now() + '.' + fileExtension;
                cb(null, newFilename);
            }
        }),
        fileFilter: (req, file, cb) => {
            if(file.size > 1000) return cb(null, false);
            if(!file.originalname.match(/\.(png|jpg|jpeg|svg)$/))
                return cb(null, false);
            cb(null, true);
        },
    }))
    async updatePhoto_user(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        const lastProfil = await this.associationsService.verifyPhoto_path(parseInt(req.user.id));
        if(lastProfil.photoPath) {
            const fs = require('fs');
            fs.unlink('./uploads' + lastProfil.photoPath, (err: any, data: any) => {
                if(err) throw new Error('Erreur de suppression de fichier !');
            });
        }
        const photo_path = `/assiacitions_photo/${ file.filename }`;
        return await this.associationsService.update_photo(photo_path, parseInt(req.user.id));
    }
}
