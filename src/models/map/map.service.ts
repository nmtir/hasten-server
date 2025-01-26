import { Map } from './entities/map.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map)
    private readonly mapRepository: Repository<Map>,
  ) {}

  async findAll(): Promise<Map[]> {
    return this.mapRepository.find();
  }

  async findById(id: number): Promise<Map> {
    const map = await this.mapRepository.findOne({ where: { id: id } });
    if (!map) {
      throw new NotFoundException('Map not found');
    }
    return map;
  }

  async create(createMapDto: CreateMapDto): Promise<Map> {
    const map = this.mapRepository.create(createMapDto);
    return this.mapRepository.save(map);
  }

  async update(id: number, updateMapDto: UpdateMapDto): Promise<Map> {
    const existingMap = await this.findById(id);
    const updatedMap = { ...existingMap, ...updateMapDto };
    return this.mapRepository.save(updatedMap);
  }

  async remove(id: number): Promise<void> {
    const map = await this.findById(id);
    await this.mapRepository.remove(map);
  }
}
