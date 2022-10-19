import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import { AuthDto, AuthReponse, AuthReponseToken } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private authRepository: Repository<Users>,
        private JwtService: JwtService
    ) {}
    
    private async signAuth(donnees: AuthReponse): Promise<string> {
        return this.JwtService.signAsync({
            id: donnees.id,
            nom: donnees.nom,
            prenoms: donnees.prenoms,
            email: donnees.email,
            tel: donnees.tel
        });
    }

    async authentifier(donnees: AuthDto): Promise<AuthReponseToken> {
        const reponse =  await this.authRepository
            .createQueryBuilder('u')
            .select([
                'u.id', 'u.nom', 'u.prenoms',
                'u.email', 'u.tel'
            ])
            .where(`(u.email=:identifiant OR u.tel=:identifiant) 
                AND u.password=SHA2(:password, 256)`, {
                    identifiant: donnees.identifiant,
                    password: donnees.password
                })
            .getRawOne();
        if(!reponse) throw new UnauthorizedException('Credentials incorrects !');
        return {
            access_token: await this.signAuth(reponse)
        }
    }
}
