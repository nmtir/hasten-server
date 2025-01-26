import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  Put,
  Post,
  Body,
} from '@nestjs/common';

import { TaskService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
  @Get('single/:id')
  getTask(@Param('id') id: number) {
    return this.tasksService.getTask(id);
  }
  @Get('tags/:id')
  getTaskTags(@Param('id') id: number) {
    return this.tasksService.getTaskTags(id);
  }

  @Post('add')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put('edit/:id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
  @Put('update/:id')
  updateFullTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Query('ids') ids: string,
  ) {
    if (!ids) {
      // Handle empty ids, either return an empty array or a default response
      return this.tasksService.getTaskTags(id);
    }

    // Split the string of ids into an array of numbers
    const idArray = ids.split(',').map(Number);

    // Ensure all ids are valid numbers (optional)
    if (idArray.some(isNaN)) {
      throw new Error('Invalid id format'); // Or handle validation as needed
    }
    void this.tasksService.updateTaskTags(id, idArray);
    return this.tasksService.updateTask(id, updateTaskDto);
  }
  @Put('/tag/:taskId/:tagId')
  updateTaskTag(
    @Param('taskId') taskId: number,
    @Param('tagId') tagId: number,
  ) {
    return this.tasksService.updateTaskTag(taskId, tagId);
  }
  @Put('/tags/:taskId')
  updateTaskTags(@Param('taskId') taskId: number, @Query('ids') ids: string) {
    if (!ids) {
      // Handle empty ids, either return an empty array or a default response
      return this.tasksService.getTaskTags(taskId);
    }

    // Split the string of ids into an array of numbers
    const idArray = ids.split(',').map(Number);

    // Ensure all ids are valid numbers (optional)
    if (idArray.some(isNaN)) {
      throw new Error('Invalid id format'); // Or handle validation as needed
    }
    return this.tasksService.updateTaskTags(taskId, idArray);
  }
  @Put('/board/:taskId/:boardId')
  updateTaskBoard(
    @Param('taskId') taskId: number,
    @Param('boardId') boardId: number,
  ) {
    return this.tasksService.updateTaskBoard(taskId, boardId);
  }
  @Put('/priority/:taskId/:priorityId')
  updateTaskPriority(
    @Param('taskId') taskId: number,
    @Param('priorityId') priorityId: number,
  ) {
    return this.tasksService.updateTaskPriority(taskId, priorityId);
  }
  @Put('/date/:start/:end/:taskId')
  updateTaskDates(
    @Param('start') start: Date,
    @Param('end') end: Date,
    @Param('taskId') taskId: number,
  ) {
    return this.tasksService.updateTaskDate(start, end, taskId);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Get('user/:id')
  getUserTasks(@Param('id') id: number) {
    return this.tasksService.getUserTasks(id);
  }

  @Get('withtags/:id')
  async getUserTasksWithTags(
    @Param('id') id: number,
    @Query('relations') relations?: string[],
  ) {
    return this.tasksService.getUserTasksWithTags(id, relations);
  }

  @Get('boards')
  getBoardsTasks(@Query('boardIds') boardIds: string) {
    const boardIdsArray = boardIds.split(',').map((id) => parseInt(id, 10)); // Convert string to array of numbers
    return this.tasksService.getBoardsTasks(boardIdsArray);
  }
  @Get('parents')
  getParentsTasks(@Query('taskIds') taskIds: string) {
    const taskIdsArray = taskIds.split(',').map((id) => parseInt(id, 10)); // Convert string to array of numbers
    return this.tasksService.getParentsTasks(taskIdsArray);
  }
  @Get('parents/single')
  getParentTasks(@Query('taskId') taskId: number) {
    return this.tasksService.getParentTasks(taskId);
  }
}
