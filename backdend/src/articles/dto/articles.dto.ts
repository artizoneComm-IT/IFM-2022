import { ApiProperty } from "@nestjs/swagger";

export class CreateArticlesDto {
    @ApiProperty()
    nom_article: string;

    @ApiProperty()
    nombres: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    categorie_id: number;

    @ApiProperty()
    type_article_id: number;
}

export class ParamArticlesDto {
    @ApiProperty()
    id: number;
}

export class UpdateArticlesDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nom_article: string;

    @ApiProperty()
    nombres: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    categorie_id: number;

    @ApiProperty()
    type_article_id: number;
}
