import { Area } from './entities/area/area.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async findAll(): Promise<Area[]> {
    return this.areaRepository.find();
  }

  async findById(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({ where: { id: id } });
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    return area;
  }

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const area = this.areaRepository.create(createAreaDto);
    return this.areaRepository.save(area);
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const existingArea = await this.findById(id);
    const updatedArea = { ...existingArea, ...updateAreaDto };
    return this.areaRepository.save(updatedArea);
  }

  async remove(id: number): Promise<void> {
    const area = await this.findById(id);
    await this.areaRepository.remove(area);
  }
}
