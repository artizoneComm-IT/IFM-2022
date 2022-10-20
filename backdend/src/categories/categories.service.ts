import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>
    ) {}

    async findall(): Promise<Categories[]> {
        return await this.categoriesRepository
        .createQueryBuilder('c')
        .select([
            'c.id as id', 'c.nom_categorie as categorie'
        ])
        .getRawMany();
    }
}
