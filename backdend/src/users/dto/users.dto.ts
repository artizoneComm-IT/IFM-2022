export class CreateUsersDto {
    nom: string;
    prenoms: string;
    email: string;
    tel: string;
    password: string;
}

export class UpdateUsersDto {
    email: string;
    tel: string;
    facebook: string;
}
