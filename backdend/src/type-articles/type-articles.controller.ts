import { Controller, Get } from '@nestjs/common';
import { TypeArticlesService } from './type-articles.service';

@Controller('type-articles')
export class TypeArticlesController {
    constructor(
        private type_articlesService: TypeArticlesService
    ) {}

    @Get('all')
    async findallTypeArticles() {
        return await this.type_articlesService.findall();
    }
}
