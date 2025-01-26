import { Controller, Get, Body, Param, Put, Delete, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTagDto } from './dto/update-tags.dto';
import { CreateBoardDto } from '../boards/dto/create-board.dto';
import { CreateTagDto } from './dto/create-tags.dto';

@ApiTags('Tags')
@Controller({
  path: 'tags',
  version: '1',
})
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }
  @Get('single/:id')
  getTag(@Param('id') id: number) {
    return this.tagService.getTag(id);
  }
  @Get('user/:id')
  getUserTags(@Param('id') id: number) {
    return this.tagService.getUserTags(id);
  }
  @Post('user/:id')
  postUserTag(@Body() createTagDto: CreateTagDto, @Param('id') id: number) {
    return this.tagService.createUserTag(createTagDto, id);
  }

  @Put('edit/:id')
  editTag(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.editTag(id, updateTagDto);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: number) {
    return this.tagService.deleteTag(id);
  }
}
