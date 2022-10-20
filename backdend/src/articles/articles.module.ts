import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Articles])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
