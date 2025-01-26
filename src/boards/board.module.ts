import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { BoardService } from './board.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Category])],
  controllers: [BoardController],
  providers: [IsExist, IsNotExist, BoardService],
  exports: [BoardService],
})
export class BoardModule {}
