import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeArticles } from 'src/entities/TypeArticles';
import { TypeArticlesController } from './type-articles.controller';
import { TypeArticlesService } from './type-articles.service';

@Module({
  imports: [ TypeOrmModule.forFeature([TypeArticles])],
  controllers: [TypeArticlesController],
  providers: [TypeArticlesService]
})
export class TypeArticlesModule {}
