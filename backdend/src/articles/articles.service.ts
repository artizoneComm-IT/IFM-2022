import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Repository } from 'typeorm';
import { CreateArticlesDto } from './dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Articles)
        private articlesRepository: Repository<Articles>
    ) {}

    async create(donnees: CreateArticlesDto, user_id: number): Promise<void> {
        await this.articlesRepository
        .createQueryBuilder()
        .insert()
        .into(Articles)
        .values({
            nomArticle: donnees.nom_article,
            nombres: donnees.nombres,
            description: donnees.description,
            userId: user_id,
            categorieId: donnees.categorie_id,
            typeArticleId: donnees.type_article_id
        })
        .execute();
    }
}
