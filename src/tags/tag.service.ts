import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tags.dto';
import { UpdateTagDto } from './dto/update-tags.dto';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }
  async getUserTags(id: number): Promise<Tag[]> {
    return await this.tagRepository.findBy({
      userId: id,
    });
  }

  async getTag(id: number): Promise<Tag | null> {
    return await this.tagRepository.findOneBy({
      id: id,
    });
  }

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(newTag);
  }
  async createUserTag(createTagDto: CreateTagDto, id: number): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);

    // Find the user by ID
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['tags'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Assign the tag to the user
    user.tags.push(tag);
    const res = await this.tagRepository.save(tag);
    // Save the tag and the user
    await this.userRepository.save(user);
    return res;
  }

  async updateTag(id: number, updateTagDto: UpdateTagDto): Promise<Tag | null> {
    await this.tagRepository.update(id, updateTagDto);
    return this.getTag(id);
  }
  async editTag(id: number, updateTagDto: UpdateTagDto): Promise<Tag | null> {
    await this.tagRepository.update(id, updateTagDto);
    return this.getTag(id);
  }

  async deleteTag(id: number): Promise<void> {
    const tag = await this.tagRepository.findOne({ where: { id: id } });
    if (!tag) {
      throw new Error('Tag not found');
    }

    // Remove the tag from all tasks
    await this.taskRepository
      .createQueryBuilder()
      .relation(Task, 'tags')
      .of(await this.taskRepository.find({ where: { tags: { id: id } } }))
      .remove(tag);

    // Delete the tag itself
    await this.tagRepository.delete(id);
  }
}
