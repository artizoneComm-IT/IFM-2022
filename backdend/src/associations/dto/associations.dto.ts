import { ApiProperty } from "@nestjs/swagger";

export class CreateAssociationsDto {
    @ApiProperty()
    nom_association: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    tel: string;

    @ApiProperty()
    password: string;
}

export class UpdateAssociationsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nom_association: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    tel: string;

    @ApiProperty()
    facebook: string;
}

export class UpdateAssociationPasswordDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    last_password: string;

    @ApiProperty()
    new_password: string;
}

export class ParamAssociationsDto {
    @ApiProperty()
    id: number;
}

export class ParamRemoveAssociationsDto {
    @ApiProperty()
    id: number;
}

export class NomAssociationDto {
    @ApiProperty()
    nom: string;
}
