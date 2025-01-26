import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { Board } from '../../boards/entities/board.entity';
import { Priority } from '../../priorities/entities/priority.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Task extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  completed: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @OneToMany(() => Task, (task) => task.task, { cascade: ['remove'] })
  subtasks: Task[];
  @ManyToOne(() => Task, (task) => task.subtasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  task: Task;
  @ManyToOne(() => Priority, (priority) => priority.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  priority: Priority;
  @Column({ nullable: true })
  priorityId: number;
  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  user: User;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  taskId: number;
  @Column({ nullable: true })
  allDay: boolean;
  @ManyToOne(() => Board, (board) => board.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  board: Board;
  @Column({ nullable: true })
  boardId: number;
  @ManyToOne(() => Category, (category) => category.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  category: Category;
  @Column({ nullable: true })
  categoryId: number;
  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
