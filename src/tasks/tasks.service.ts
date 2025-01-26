import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Board } from '../boards/entities/board.entity';
import { Priority } from '../priorities/entities/priority.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTask(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }
  async getTaskTags(taskId: number): Promise<Tag[] | undefined> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['tags'], // This ensures that tags are fetched along with the task
    });
    return task?.tags;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask: Task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.getTask(id);
  }
  async updateTaskTag(taskId: number, tagId: number): Promise<Tag[] | null> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['tags'], // Ensure category is loaded
    });
    const tag = await this.tagRepository.findOne({ where: { id: tagId } });
    const foundTag = task?.tags.find((t) => t.id === tagId);
    if (task && tag) {
      if (foundTag) {
        task.tags = task.tags.filter((t) => t.id !== tagId);
        await this.taskRepository.save(task);
        return task.tags;
      } else {
        task.tags.push(tag);
        await this.taskRepository.save(task);
        return task.tags;
      }
    }
    return null;
  }
  async updateTaskTags(taskId: number, ids: number[]): Promise<Tag[] | null> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['tags'], // Ensure tags are loaded
    });

    if (!task) {
      return null; // Task not found
    }

    const tagsToUpdate = await this.tagRepository.findByIds(ids);

    // Create a Set of the incoming tag IDs for quick lookup
    const incomingTagIds = new Set(ids);

    // Separate tags to be added and removed
    const tagsToAdd = tagsToUpdate.filter(
      (tag) => !task.tags.some((existingTag) => existingTag.id === tag.id),
    );
    const tagsToRemove = task.tags.filter(
      (existingTag) => !incomingTagIds.has(existingTag.id),
    );

    // Update task tags
    task.tags = task.tags
      .filter(
        (existingTag) => !tagsToRemove.some((tag) => tag.id === existingTag.id),
      )
      .concat(tagsToAdd);

    await this.taskRepository.save(task);

    return task.tags;
  }
  async updateTaskBoard(taskId: number, id: number): Promise<Board | null> {
    await this.taskRepository.update(taskId, { boardId: id });
    return this.boardRepository.findOneBy({ id });
  }
  async updateTaskPriority(
    taskId: number,
    id: number,
  ): Promise<Priority | null> {
    await this.taskRepository.update(taskId, { priorityId: id });
    return this.priorityRepository.findOneBy({ id });
  }
  async updateTaskDate(
    start: Date,
    end: Date,
    id: number,
  ): Promise<Task | null> {
    await this.taskRepository.update(id, { start: start, end: end });
    return this.taskRepository.findOneBy({ id });
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
  async getUserTasksWithTags(
    id: number,
    relations: string[] | undefined,
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId: id },
      relations: relations,
    });
  }

  async getUserTasks(id: number): Promise<
    {
      task: Task;
    }[]
  > {
    const tasks = await this.taskRepository.find({
      where: { userId: id },
      relations: ['category', 'tags'], // Ensure category is loaded
    });

    return tasks.map((task) => ({
      ...task,
      category: task.category,
      backgroundColor:
        task.category && task.category.color ? task.category.color : '#6f3f96',
      display: 'block',
      extendedProps: {
        category:
          task.category && task.category.title
            ? task.category.title
            : 'default', // Default to 'default' if no category title
        color:
          task.category && task.category.color
            ? task.category.color
            : '#6f3f96', // Default to 'default' if no category title
      },
    }));
  }
  async getBoardsTasks(boardIds: number[]): Promise<any[]> {
    const tasks = await this.taskRepository.find({
      where: {
        boardId: In(boardIds),
      },
      relations: ['tags'],
    });

    const serializedTasks = tasks.map((task) => ({
      ...task,
      tags: task.tags.map((tag) => tag.id),
    }));

    return serializedTasks;
  }
  async getParentsTasks(taskIds: number[]): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        taskId: In(taskIds),
      },
    });
  }
  async getParentTasks(taskId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        taskId: taskId,
      },
    });
  }
}
