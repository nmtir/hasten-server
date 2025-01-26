import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Priorities')
@Controller({
  path: 'priorities',
  version: '1',
})
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  getAllPriorities() {
    return this.priorityService.getAllPriorities();
  }

  @Get('single/:id')
  getPriority(@Param('id') id: number) {
    return this.priorityService.getPriority(id);
  }

  @Post()
  createPriority(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.createPriority(createPriorityDto);
  }
  @Post('user/:id')
  createUserPriority(
    @Body() createPriorityDto: CreatePriorityDto,
    @Param('id') id: number,
  ) {
    return this.priorityService.createUserPriority(createPriorityDto, id);
  }

  @Put('/edit/:id')
  updatePriority(
    @Param('id') id: number,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.priorityService.updatePriority(id, updatePriorityDto);
  }

  @Delete('single/:id')
  deletePriority(@Param('id') id: number) {
    return this.priorityService.deletePriority(id);
  }
  @Get('user/:id')
  getUserPriorities(@Param('id') id: number) {
    return this.priorityService.getUserPriorities(id);
  }
}
