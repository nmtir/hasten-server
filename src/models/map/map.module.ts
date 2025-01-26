import { Map } from './entities/map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([Map])],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
