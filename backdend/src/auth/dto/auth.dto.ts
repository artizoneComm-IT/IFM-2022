export class AuthDto {
    identifiant: string;
    password: string;
}

export class AuthReponse {
    id: number;
    nom: string;
    prenoms: string;
    email: string;
    tel: string;
}

export class AuthReponseToken {
    access_token: string;
}
