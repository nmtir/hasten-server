import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TagController } from './tag.controller';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, User, Task])],
  controllers: [TagController],
  providers: [IsExist, IsNotExist, TagService],
  exports: [TagService],
})
export class TagModule {}
