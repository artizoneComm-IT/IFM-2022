import { Controller, Get, NotAcceptableException, Param, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { DestIdDto } from "./dto";
import { MessagesService } from "./messages.service";

@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
    constructor(
        private messagesServices: MessagesService
    ) {}

    @UseGuards(AuthGuard('jwtZarao'))
    @Get('all/:dest_id')
    async findallMessages(@Param() donnees: DestIdDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException('Credentials incorrects !');
        return await this.messagesServices.findall(donnees, parseInt(req.user.id));
    }
}
