import { Body, Controller, Delete, Get, NotAcceptableException, 
    Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AssociationsService } from './associations.service';
import { CreateAssociationsDto, ParamAssociationsDto, 
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
    async findAssociationBy(@Body() donnees: { nom: string }) {
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

    @Delete('delete')
    async removeAssociations(@Param() donnees: ParamRemoveAssociationsDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.associationsService.remove(donnees, parseInt(req.user.id));
    }
}
