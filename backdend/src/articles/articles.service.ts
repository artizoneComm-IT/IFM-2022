import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Associations } from 'src/entities/Associations';
import { Categories } from 'src/entities/Categories';
import { TypeArticles } from 'src/entities/TypeArticles';
import { Users } from 'src/entities/Users';
import { Articles } from 'src/entities/Articles';
import { CategoriesArticlesDto, CreateArticlesDto, 
    NomArticleDto, ParamArticlesDto, TypeArticlesDto, 
    UpdateArticlesDto } from './dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Articles)
        private articlesRepository: Repository<Articles>
    ) {}

    async createUsers(donnees: CreateArticlesDto, user_id: number): Promise<void> {
        await this.articlesRepository
        .createQueryBuilder()
        .insert()
        .into(Articles)
        .values({
            nomArticle: donnees.nom_article,
            nombres: donnees.nombres,
            prixArticle: donnees.prix_article,
            description: donnees.description,
            userId: user_id,
            categorieId: donnees.categorie_id,
            typeArticleId: donnees.type_article_id,
            pathImage: donnees.path_image
        })
        .execute();
    }

    async createByAssociations(donnees: CreateArticlesDto, association_id: number): Promise<void> {
        await this.articlesRepository
        .createQueryBuilder()
        .insert()
        .into(Articles)
        .values({
            nomArticle: donnees.nom_article,
            nombres: donnees.nombres,
            prixArticle: donnees.prix_article,
            description: donnees.description,
            associationId: association_id,
            categorieId: donnees.categorie_id,
            typeArticleId: donnees.type_article_id,
            pathImage: donnees.path_image
        })
        .execute();
    }

    async findall(): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .getRawMany();
    }

    async findallbyUsersId(user_id: number): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .where(`a.user_id=:identifiant`, { identifiant: user_id })
        .getRawMany();
    }

    async findallbyAssociationId(association_id: number): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .where(`a.user_id=:identifiant`, { identifiant: association_id })
        .getRawMany();
    }

    async findone(donnees: ParamArticlesDto): Promise<Articles> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .where(`a.id=:identifiant`, { identifiant: donnees.id })
        .getRawOne();
    }

    async findByName(donnees: NomArticleDto): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .where(`SOUNDEX(a.nom_article)=SOUNDEX(:identifiant)`, 
            { identifiant: donnees.nom })
        .getRawMany();
    }

    async findByCategories(donnees: CategoriesArticlesDto): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .where(`a.categorie_id)=:identifiant`, 
            { identifiant: donnees.categorie_id })
        .getRawMany();
    }

    async findByTypeArticles(donnees: TypeArticlesDto): Promise<Articles[]> {
        return await this.articlesRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_article as nom_article',
            'a.prix_article as prix_article',
            'a.nombres as nombres', 'a.description as description',
            'a.created_at as created_at', 'a.updated_at as updated_at',
            'u.nom as nom_createur', 'u.prenoms as prenoms_createur',
            'u.tel as tel_createur', 
            'as.nom_association as nom_association_createur',
            'as.tel as tel_association_createur',
            'c.nom_categorie as categorie_article',
            't.type as type_article', 'a.path_image as path_image'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .innerJoin(Categories, 'c', 'c.id = a.categorie_id')
        .innerJoin(TypeArticles, 't', 't.id = a.type_article_id')
        .innerJoin(Associations, 'as', 'as.id = a.association_id')
        .where(`a.type_article_id)=:identifiant`, 
            { identifiant: donnees.type_article_id })
        .getRawMany();
    }

    async update(donnees: UpdateArticlesDto, user_id: number): Promise<void> {
        const verify: Articles = await this.articlesRepository
        .createQueryBuilder('a')
        .select(['a.id'])
        .where(`a.id=:identifiant AND a.user_id=:userId`, {
            identifiant: donnees.id,
            userId: user_id
        })
        .getRawOne();

        if(!verify) throw new ForbiddenException('Credentials incorrects !');
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

    async remove(donnees: ParamArticlesDto, user_id: number): Promise<void> {
        const verify: Articles = await this.articlesRepository
        .createQueryBuilder('a')
        .select(['a.id'])
        .where(`a.id=:identifiant AND a.user_id=:userId`, {
            identifiant: donnees.id,
            userId: user_id
        })
        .getRawOne();

        if(!verify) throw new ForbiddenException('Credentials incorrects !');
        await this.articlesRepository.delete(donnees.id);
    }
}
