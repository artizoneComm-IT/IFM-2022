import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    async create(donnees: CreateUsersDto): Promise<void> {
        await this.usersRepository
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values({
                nom: donnees.nom,
                prenoms: donnees.prenoms,
                email: donnees.email,
                tel: donnees.tel,
                password: () => 'SHA2('+donnees.password+', 256)'
            })
            .execute();
    }

    async findall(): Promise<Users[]> {
        return await this.usersRepository
            .createQueryBuilder('u')
            .select([
                'u.id as id', 'u.nom as nom', 'u.prenoms as prenoms',
                'u.email as email', 'u.tel as tel', 'u.facebook as facebook',
                'u.photo_path as photo_path'
            ])
            .getRawMany();
    }
    async findone(donnees: { id: number }): Promise<Users> {
        return await this.usersRepository
            .createQueryBuilder('u')
            .select([])
            .where(`u.id=:identifiant`, { identifiant: donnees.id })
            .getRawOne();
    }
}
