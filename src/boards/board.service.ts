import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }
  async getUserBoards(id: number): Promise<Board[]> {
    return await this.boardRepository.findBy({
      userId: id,
    });
  }
  async getCategoryBoards(id: number): Promise<Board[]> {
    return await this.boardRepository.findBy({
      categoryId: id,
    });
  }
  async getCategoriesBoards(ids: number[]): Promise<Board[]> {
    return await this.boardRepository.findBy({
      categoryId: In(ids),
    });
  }
  async getBoard(id: number): Promise<Board | null> {
    return await this.boardRepository.findOneBy({
      id: id,
    });
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoard = this.boardRepository.create(createBoardDto);
    return await this.boardRepository.save(newBoard);
  }
  async createCategoryBoard(
    createBoardDto: CreateBoardDto,
    id: number,
  ): Promise<Board> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['user'], // Ensure category is loaded
    });
    if (!category) {
      throw new Error('Category not found');
    }

    const newBoardFunction = createBoardDto.function;
    if (newBoardFunction && newBoardFunction.trim() !== '') {
      const existingBoardWithFunction = await this.boardRepository.findOne({
        where: {
          function: newBoardFunction,
          categoryId: id,
        },
      });
      if (existingBoardWithFunction) {
        existingBoardWithFunction.function = '';
        await this.boardRepository.save(existingBoardWithFunction);
      }
    }
    const newBoard = this.boardRepository.create({
      ...createBoardDto,
      category: category,
      user: category.user,
    });
    return await this.boardRepository.save(newBoard);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board | null> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new Error('Board not found');
    }

    const newFunction = updateBoardDto.function;
    const oldFunction = board.function;

    if (newFunction && newFunction.trim() !== '') {
      const existingBoardWithFunction = await this.boardRepository.findOne({
        where: { function: newFunction, categoryId: board.categoryId },
      });

      if (existingBoardWithFunction && existingBoardWithFunction.id !== id) {
        existingBoardWithFunction.function = oldFunction || '';
        await this.boardRepository.save(existingBoardWithFunction);
      }
    }

    await this.boardRepository.update(id, updateBoardDto);
    return await this.getBoard(id);
  }

  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
