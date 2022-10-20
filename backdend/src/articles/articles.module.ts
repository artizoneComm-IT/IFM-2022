import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Categories } from 'src/entities/Categories';
import { TypeArticles } from 'src/entities/TypeArticles';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Articles, Categories, TypeArticles])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
