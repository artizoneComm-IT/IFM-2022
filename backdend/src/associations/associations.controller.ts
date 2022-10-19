import { Body, Controller, NotAcceptableException, 
    Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssociationsService } from './associations.service';
import { CreateAssociationsDto } from './dto/associations.dto';

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
}
