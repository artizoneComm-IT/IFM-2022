import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import { AuthDto, AuthReponseUsers, AuthReponseToken, AuthReponseAssociations } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private authRepository: Repository<Users>,
        private jwtService: JwtService
    ) {}
    
    private async signAuthUsers(donnees: AuthReponseUsers): Promise<string> {
        return await this.jwtService.signAsync({
            id: donnees.id,
            nom: donnees.nom,
            prenoms: donnees.prenoms,
            email: donnees.email,
            tel: donnees.tel
        });
    }

    private async signAuthAssociations(donnees: AuthReponseAssociations): Promise<string> {
        return await this.jwtService.signAsync({
            id: donnees.id,
            nom_association: donnees.nom_association,
            email: donnees.email,
            tel: donnees.tel
        });
    }

    async authentifierAsUsers(donnees: AuthDto): Promise<AuthReponseToken> {
        const reponse: AuthReponseUsers =  await this.authRepository
            .createQueryBuilder('u')
            .select([
                'u.id as id', 'u.nom as nom', 'u.prenoms as prenoms',
                'u.email as email', 'u.tel as tel'
            ])
            .where(`(u.email=:identifiant OR u.tel=:identifiant) 
                AND u.password=SHA2(:password, 256)`, {
                    identifiant: donnees.identifiant,
                    password: donnees.password
                })
            .getRawOne();
        if(!reponse) throw new UnauthorizedException('Credentials incorrects !');
        return {
            access_token: await this.signAuthUsers(reponse)
        }
    }

    async authentifierAsAssociation(donnees: AuthDto): Promise<AuthReponseToken> {
        const reponse: AuthReponseAssociations = await this.authRepository
            .createQueryBuilder('a')
            .select([
                'a.id as id', 'a.nom_association as nom_association',
                'a.email as email', 'a.tel as tel'
            ])
            .where(`(a.email=:identifiant OR a.tel=:identifiant)
                AND a.password=SHA2(:password, 256)`, {
                    identifiant: donnees.identifiant,
                    password: donnees.password
                })
            .getRawOne();
        if(!reponse) throw new UnauthorizedException('Credentials incorrects !');
        return {
            access_token: await this.signAuthAssociations(reponse)
        }
    }
}
