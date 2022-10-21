import { Body, Controller, Delete, ForbiddenException, Get, NotAcceptableException, 
    Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { ArticlesService } from './articles.service';
import { CategoriesArticlesDto, CreateArticlesDto, NomArticleDto, ParamArticlesDto, TypeArticlesDto, UpdateArticlesDto } from './dto';

@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
    constructor(
        private articlesService: ArticlesService
    ) {}

    @UseGuards(AuthGuard('jwtZarao'))
    @Post('users/create')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/users_photo_articles/",
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
    async createArticlesUsers(@Body() donnees: CreateArticlesDto, @Request() req: any, 
        @UploadedFile() file: Express.Multer.File) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        if(!req.user.nom) throw new ForbiddenException('Credentials incorrects !');
        const data = { 
            ... donnees, 
            path_image: `/users_photo_articles/${ file.filename }`
        };
        return await this.articlesService.createUsers(data, parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Post('associations/create')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/associations_photo_articles/",
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
    async createArticlesAssociations(@Body() donnees: CreateArticlesDto, @Request() req: any,
        @UploadedFile() file: Express.Multer.File) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        if(!req.user.nom_association) throw new ForbiddenException('Credentials incorrects !');
        const data = { 
            ... donnees, 
            path_image: `/associations_photo_articles/${ file.filename }`
        };
        return await this.articlesService.createByAssociations(data, parseInt(req.user.id));
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
    @Get('users')
    async findallArticlesByUsersId(@Request() req: any) {
        if(!req.user.nom) throw new ForbiddenException('Credentials incorrects !');
        return await this.articlesService.findallbyUsersId(parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwtZarao'))
    @Get('associations')
    async findallArticlesByAssociationsId(@Request() req: any) {
        if(!req.user.nom_association) throw new ForbiddenException('Credentials incorrects !');
        return await this.articlesService.findallbyAssociationId(parseInt(req.user.id));
    }

    @Get('nom/:nom')
    async findArticlesByNom(@Param() donnees: NomArticleDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.findByName(donnees);
    }

    @Get('categorie/:categorie_id')
    async findArticlesByCategories(@Param() donnees: CategoriesArticlesDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.findByCategories(donnees);
    }

    @Get('type-article/:type_article_id')
    async findArticlesByTypeArticles(@Param() donnees: TypeArticlesDto) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.articlesService.findByTypeArticles(donnees);
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
