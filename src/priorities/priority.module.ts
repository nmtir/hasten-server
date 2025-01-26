import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Priority } from './entities/priority.entity';
import { PriorityController } from './priority.controller';
import { PriorityService } from './priority.service';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Priority, User,Task])],
  controllers: [PriorityController],
  providers: [IsExist, IsNotExist, PriorityService],
  exports: [PriorityService],
})
export class PrioritiesModule {}
