import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {
    @ApiProperty()
    nom: string;

    @ApiProperty()
    prenoms: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    tel: string;

    @ApiProperty()
    password: string;
}

export class UpdateUsersDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    tel: string;

    @ApiProperty()
    facebook: string;
}

export class UpdatePasswordDto {
    @ApiProperty()
    last_password: string;

    @ApiProperty()
    new_password: string;
}


export class ParamUsersDto {
    @ApiProperty()
    id: number;
}