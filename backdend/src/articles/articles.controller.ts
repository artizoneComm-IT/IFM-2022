import { Body, Controller, Delete, Get, NotAcceptableException, 
    Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto, ParamArticlesDto, UpdateArticlesDto } from './dto';

@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
    constructor(
        private articlesService: ArticlesService
    ) {}

    @UseGuards(AuthGuard('jwtZarao'))
    @Post('create')
    async createArticles(@Body() donnees: CreateArticlesDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.create(donnees, parseInt(req.user.id));
    }

    @Get('all')
    async findlallArticles() {
        return await this.articlesService.findall();
    }

    @Get(':id')
    async findArticlesById(@Param() donnees: ParamArticlesDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.findone(donnees);
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Put('update')
    async updateArticles(@Body() donnees: UpdateArticlesDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.update(donnees, parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Delete('delete')
    async removeArticles(@Body() donnees: ParamArticlesDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.remove(donnees, parseInt(req.user.id));
    }
}
