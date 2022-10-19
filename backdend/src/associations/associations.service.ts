import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Associations } from 'src/entities/Associations';
import { Repository } from 'typeorm';
import { CreateAssociationsDto } from './dto/associations.dto';

@Injectable()
export class AssociationsService {
    constructor(
        @InjectRepository(Associations)
        private associationsRepository: Repository<Associations>
    ) {}

    async create(donnees: CreateAssociationsDto, user_id: number): Promise<void> {
        await this.associationsRepository
            .createQueryBuilder()
            .insert()
            .into(Associations)
            .values({
                nomAssociation: donnees.nom_association,
                email: donnees.email,
                tel: donnees.tel,
                password: donnees.password,
                userId: user_id
            })
            .execute();
    }
}
