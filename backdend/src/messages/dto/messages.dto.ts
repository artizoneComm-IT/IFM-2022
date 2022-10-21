import { ApiProperty } from "@nestjs/swagger";

export class CreateMessagesDto {
    @ApiProperty()
    message: string;

    @ApiProperty()
    dest_id: number;
}


export class DestIdDto {
    @ApiProperty()
    dest_id: number;
}