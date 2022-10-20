import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { Associations } from 'src/entities/Associations';

@Module({
  imports: [TypeOrmModule.forFeature([Associations])],
  controllers: [AssociationsController],
  providers: [AssociationsService]
})
export class AssociationsModule {}
