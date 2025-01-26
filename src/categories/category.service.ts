import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategory(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({ id });
  }
  async getCategoriesByUser(id: number): Promise<Category[] | null> {
    return await this.categoryRepository.find({
      where: {
        userId: id,
      },
    });
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    id: number,
  ): Promise<Category> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      user, // Assign the user to the category
    });
    return await this.categoryRepository.save(newCategory);
  }
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.getCategory(id);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
