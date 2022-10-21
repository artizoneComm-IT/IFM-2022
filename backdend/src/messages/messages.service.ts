import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/entities/Messages';
import { Repository } from 'typeorm';
import { CreateMessagesDto, DestIdDto } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messagesRepostory: Repository<Messages>
  ) {}

  async findall(donnees: DestIdDto, user_id: number): Promise<Messages[]> {
    return await this.messagesRepostory
    .createQueryBuilder('m')
    .select([
      'm.id as id', 'm.message as message',
      'm.type_message_id as type_message_id',
      'm.path_file as path_file'
    ])
    .where(`m.user_id=:userId AND m.dest_id=:destId`, {
      userId: user_id,
      destId: donnees.dest_id
    })
    .orderBy('m.id', 'DESC')
    .getRawMany();
  }

  async create(donnees: CreateMessagesDto, user_id: number): Promise<void> {
    await this.messagesRepostory
    .createQueryBuilder()
    .insert()
    .into(Messages)
    .values({
      message: donnees.message,
      userId: user_id,
      destId: donnees.dest_id
    })
    .execute();
  }
}
