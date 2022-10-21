import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/entities/Messages';
import { MessagesController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesGateway, MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
