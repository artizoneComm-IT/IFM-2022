import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/entities/Articles';
import { Associations } from 'src/entities/Associations';
import { Categories } from 'src/entities/Categories';
import { TypeArticles } from 'src/entities/TypeArticles';
import { Users } from 'src/entities/Users';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([
      Articles, Categories, 
      TypeArticles, Users,
      Associations
    ])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
