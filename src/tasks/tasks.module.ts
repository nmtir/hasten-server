import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Task } from './entities/task.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Board } from '../boards/entities/board.entity';
import { Priority } from '../priorities/entities/priority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Task, Board, Priority])],
  controllers: [TasksController],
  providers: [IsExist, IsNotExist, TaskService],
  exports: [TaskService],
})
export class TasksModule {}
