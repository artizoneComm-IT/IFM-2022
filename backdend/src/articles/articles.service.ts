import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Categories } from 'src/entities/Categories';
import { TypeArticles } from 'src/entities/TypeArticles';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { CreateArticlesDto, ParamArticlesDto, UpdateArticlesDto } from './dto';

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

    async findall(): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 'c.nom_categorie as categorie_article',
            't.type as type_article'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .getRawMany();
    }

    async findallbyUsersId(user_id: number): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 'c.nom_categorie as categorie_article',
            't.type as type_article'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .where(`a.user_id=:identifiant`, { identifiant: user_id })
        .getRawMany();
    }

    async findone(donnees: ParamArticlesDto): Promise<Articles> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 'c.nom_categorie as categorie_article',
            't.type as type_article'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .where(`a.id=:identifiant`, { identifiant: donnees.id })
        .getRawOne();
    }

    async update(donnees: UpdateArticlesDto): Promise<void> {
        await this.articlesRepository
        .createQueryBuilder()
        .update(Articles)
        .set({
            nomArticle: donnees.nom_article,
            nombres: donnees.nombres,
            description: donnees.description,
            updatedAt: () => 'NOW()',
            categorieId: donnees.categorie_id,
            typeArticleId: donnees.type_article_id
        })
        .where(`id=:identifiant`, { identifiant: donnees.id })
        .execute();
    }
}
