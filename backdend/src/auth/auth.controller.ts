import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('users')
    async authUser(@Body() donnees: AuthDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.authService.authentifierAsUsers(donnees);
    }

    @Post('associations')
    async authAssociations(@Body() donnees: AuthDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.authService.authentifierAsAssociation(donnees);
    }
}
