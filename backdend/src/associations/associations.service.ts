import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Associations } from 'src/entities/Associations';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { CreateAssociationsDto, ParamAssociationsDto, 
    UpdateAssociationPasswordDto, UpdateAssociationsDto } from './dto';

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

    async findall(): Promise<Associations[]> {
        return await this.associationsRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_association as nom_association',
            'a.email as email', 'a.tel as tel', 'a.facebook as facebook',
            'a.photo_path as photo_path', 'u.nom as nom_createur', 
            'u.prenoms as prenoms_createur', 'u.email as email_createur',
            'u.tel as tel_createur'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .getRawMany();
    }

    async findone(donnees: { id: number }): Promise<Associations> {
        return await this.associationsRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_association as nom_association',
            'a.email as email', 'a.tel as tel', 'a.facebook as facebook',
            'a.photo_path as photo_path', 'u.nom as nom_createur', 
            'u.prenoms as prenoms_createur', 'u.email as email_createur',
            'u.tel as tel_createur'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .where(`a.id=:identifiant`, { identifiant: donnees.id })
        .getRawOne();
    }

    async findallByUserId(user_id: number): Promise<Associations[]> {
        return await this.associationsRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_association as nom_association',
            'a.email as email', 'a.tel as tel', 'a.facebook as facebook',
            'a.photo_path as photo_path', 'u.nom as nom_createur', 
            'u.prenoms as prenoms_createur', 'u.email as email_createur',
            'u.tel as tel_createur'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .where(`a.user_id=:identifiant`, { identifiant: user_id })
        .getRawMany();
    }

    async findallByNomAssociation(donnees: { nom: string }): Promise<Associations[]> {
        return await this.associationsRepository
        .createQueryBuilder('a')
        .select([
            'a.id as id', 'a.nom_association as nom_association',
            'a.email as email', 'a.tel as tel', 'a.facebook as facebook',
            'a.photo_path as photo_path', 'u.nom as nom_createur', 
            'u.prenoms as prenoms_createur', 'u.email as email_createur',
            'u.tel as tel_createur'
        ])
        .innerJoin(Users, 'u', 'u.id = a.user_id')
        .where(`SOUNDEX(a.nom_association)=SOUNDEX(:identifiant)`, 
            { identifiant: donnees.nom })
        .getRawMany();
    }

    async update(donnees: UpdateAssociationsDto, user_id: number): Promise<void> {
        const verify: Associations[] = await this.associationsRepository
        .createQueryBuilder('a')
        .select(['a.id'])
        .where(`a.id=:identifiant AND a.user_id=:userId`, {
            identifiant: donnees.id,
            userId: user_id
        })
        .getRawMany();

        if(!verify) throw new ForbiddenException('Credentials incorrects !');
        await this.associationsRepository
        .createQueryBuilder()
        .update(Associations)
        .set({
            nomAssociation: donnees.nom_association,
            email: donnees.email,
            tel: donnees.tel,
            facebook: donnees.facebook
        })
        .where(`id=:identifiant`, { identifiant: donnees.id })
        .execute();
    }

    async updatePassword(donnees: UpdateAssociationPasswordDto, user_id: number): Promise<void> {
        const verify: Associations[] = await this.associationsRepository
        .createQueryBuilder('a')
        .select(['a.id'])
        .where(`a.id=:identifiant 
            AND a.password=SHA2(:password, 256) 
            AND a.user_id=:userId`, {
            identifiant: donnees.id,
            password: donnees.last_password,
            userId: user_id
        })
        .getRawMany();

        if(!verify) throw new ForbiddenException('Credentials incorrects !');
        await this.associationsRepository
        .createQueryBuilder()
        .update(Associations)
        .set({
            password: donnees.new_password
        })
        .where(`id=:identifiant AND user_id=:userId`, {
            identifiant: donnees.id,
            userId: user_id
        })
        .execute();
    }

    async remove(donnees: ParamAssociationsDto, user_id: number): Promise<void> {
        const verify: Associations[] = await this.associationsRepository
        .createQueryBuilder('a')
        .select(['a.id'])
        .where(`a.id=:identifiant AND a.user_id=:userId`, {
            identifiant: donnees.id,
            userId: user_id
        })
        .getRawMany();
        if(!verify) throw new ForbiddenException('Credentials incorrects !');
        await this.associationsRepository.delete(donnees.id);
    }
}
