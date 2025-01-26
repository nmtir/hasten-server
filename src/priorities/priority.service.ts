import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from './entities/priority.entity';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllPriorities(): Promise<Priority[]> {
    return await this.priorityRepository.find();
  }
  async getPriority(id: number): Promise<Priority | null> {
    return this.priorityRepository.findOneBy({ id });
  }

  async createPriority(
    createPriorityDto: CreatePriorityDto,
  ): Promise<Priority> {
    const newPriority = this.priorityRepository.create(createPriorityDto);
    return await this.priorityRepository.save(newPriority);
  }
  async createUserPriority(
    createPriorityDto: CreatePriorityDto,
    id: number,
  ): Promise<Priority> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new Error('User not found');
    }
    const newPriority = this.priorityRepository.create({
      ...createPriorityDto,
      user: user,
    });
    return await this.priorityRepository.save(newPriority);
  }

  async updatePriority(
    id: number,
    updatePriorityDto: UpdatePriorityDto,
  ): Promise<Priority | null> {
    await this.priorityRepository.update(id, updatePriorityDto);
    return this.getPriority(id);
  }

  async deletePriority(id: number): Promise<void> {
    await this.priorityRepository.delete(id);
  }
  async getUserPriorities(id: number): Promise<Priority[]> {
    return await this.priorityRepository.findBy({
      userId: id,
    });
  }
}
