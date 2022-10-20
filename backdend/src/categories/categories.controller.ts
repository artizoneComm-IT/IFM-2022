import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService
    ) {}

    @Get('all')
    async findallCategories() {
        return await this.categoriesService.findall();
    }
}
