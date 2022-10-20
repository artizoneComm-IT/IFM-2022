import { Body, Controller, NotAcceptableException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto';

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

    
}
