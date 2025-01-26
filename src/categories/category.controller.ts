import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('single/:id')
  getCategory(@Param('id') id: number) {
    return this.categoryService.getCategory(id);
  }
  @Get('user/:id')
  getCategoriesByUser(@Param('id') id: number) {
    return this.categoryService.getCategoriesByUser(id);
  }

  @Post('user/:id')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    console.log('dto :');
    console.log(createCategoryDto);
    return this.categoryService.createCategory(createCategoryDto, id);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    console.log('dto :', updateCategoryDto.title);
    console.log('dto :', updateCategoryDto.color);
    console.log('id :', id);
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
