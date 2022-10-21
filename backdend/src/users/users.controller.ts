import { Body, Controller, Get, NotAcceptableException, 
    Param, Patch, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { CreateUsersDto, ParamUsersDto, 
    UpdatePasswordDto, UpdateUsersDto } from './dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Post('create')
    async createUsers(@Body() donnees: CreateUsersDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.usersService.create(donnees);
    }

    @Get('all')
    async findallUsers() {
        return await this.usersService.findall();
    }

    @Get(':id')
    async findUsersById(@Param() donnees: ParamUsersDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.usersService.findone(donnees);
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Get('')
    async findUsers(@Request() req: any) {
        const donnees = { id: parseInt(req.user.id) };
        return await this.usersService.findone(donnees);
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Put('update')
    async updateUsers(@Body() donnees: UpdateUsersDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.usersService.update(donnees, parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Patch('upate-password')
    async updateUsersPassword(@Body() donnees: UpdatePasswordDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.usersService.update_password(donnees, parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Patch('update-photo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/users_photo/",
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
            if(!file.originalname.match(/\.(png|jpg|jpeg|svg)$/))
                return cb(null, false);
            cb(null, true);
        },
    }))
    async updatePhoto_user(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        const lastProfil = await this.usersService.verifyPhoto_path(parseInt(req.user.id));
        if(lastProfil.photoPath) {
            const fs = require('fs');
            fs.unlink('./uploads' + lastProfil.photoPath, (err: any, data: any) => {
                if(err) throw new Error('Erreur de suppression de fichier !');
            });
        }
        const photo_path = `/users_photo/${ file.filename }`;
        return await this.usersService.update_photo(photo_path, parseInt(req.user.id));
    }
}
