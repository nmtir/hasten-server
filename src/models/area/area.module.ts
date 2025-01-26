import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area/area.entity';
import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
