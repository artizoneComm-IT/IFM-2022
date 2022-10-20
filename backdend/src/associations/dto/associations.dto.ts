export class CreateAssociationsDto {
    nom_association: string;
    email: string;
    tel: string;
    password: string;
}

export class UpdateAssociationsDto {
    id: number;
    nom_association: string;
    email: string;
    tel: string;
    facebook: string;
}

export class UpdateAssociationPasswordDto {
    id: number;
    last_password: string;
    new_password: string;
}
