import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    identifiant: string;

    @ApiProperty()
    password: string;
}

export class AuthReponseUsers {
    id: number;
    nom: string;
    prenoms: string;
    email: string;
    tel: string;
}

export class AuthReponseAssociations {
    id: number;
    nom_association: string;
    email: string;
    tel: string;
}
export class AuthReponseToken {
    access_token: string;
}
