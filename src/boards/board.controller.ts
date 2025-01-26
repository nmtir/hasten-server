import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('Boards')
@Controller({
  path: 'boards',
  version: '1',
})
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('all')
  getAllBoards() {
    return this.boardService.getAllBoards();
  }
  @Get('single/:id')
  getBoard(@Param('id') id: number) {
    return this.boardService.getBoard(id);
  }
  @Get('user/:id')
  getUserBoards(@Param('id') id: number) {
    return this.boardService.getUserBoards(id);
  }
  @Get('category/:id')
  getCategoryBoards(@Param('id') id: number) {
    return this.boardService.getCategoryBoards(id);
  }
  @Get('categories')
  getCategoriesBoards(@Query('ids') ids: string) {
    if (!ids) {
      // Handle empty ids, either return an empty array or a default response
      return this.boardService.getCategoriesBoards([]);
    }
    // Split the string of ids into an array of numbers
    const idArray = ids.split(',').map(Number);

    return this.boardService.getCategoriesBoards(idArray);
  }

  @Post('category/:id')
  postCategoryBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Param('id') id: number,
  ) {
    return this.boardService.createCategoryBoard(createBoardDto, id);
  }

  @Put('edit/:id')
  updateBoard(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updateBoard(id, updateBoardDto);
  }

  @Delete('/single/:id')
  deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id);
  }
}
