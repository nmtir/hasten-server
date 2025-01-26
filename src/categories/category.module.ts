import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Category } from './entities/category.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,User])],
  controllers: [CategoryController],
  providers: [IsExist, IsNotExist, CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
