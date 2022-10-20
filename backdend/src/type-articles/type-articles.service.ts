import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeArticles } from 'src/entities/TypeArticles';
import { Repository } from 'typeorm';

@Injectable()
export class TypeArticlesService {
    constructor(
        @InjectRepository(TypeArticles)
        private typeArticlesRepository: Repository<TypeArticles>
    ) {}

    async findall(): Promise<TypeArticles[]> {
        return await this.typeArticlesRepository
        .createQueryBuilder('t')
        .select([
            't.id as id', 't.type as type_article'
        ])
        .getRawMany();
    }
}
