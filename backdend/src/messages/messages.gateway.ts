import { Request } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { CreateMessagesDto } from './dto';
import { MessagesService } from './messages.service';

@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessageZarao')
  async createMessages(@MessageBody() donnees: CreateMessagesDto, 
    @Request() req: any): Promise<CreateMessagesDto> {
    await this.messagesService.create(donnees, parseInt(req.user.id));
    return donnees;
  }
}
