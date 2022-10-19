import { Body, Controller, Get, NotAcceptableException, 
    Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUsersDto, UpdateUsersDto } from './dto';
import { UsersService } from './users.service';

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

    @UseGuards(AuthGuard('jwtZarao'))
    @Get('all')
    async findallUsers() {
        return await this.usersService.findall();
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Get(':id')
    async findUsersById(@Param() donnees: { id: number }) {
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
}
