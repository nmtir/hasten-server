import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
@Entity()
export class Board extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  function: string;
  @OneToMany(() => Task, (task) => task.board, {
    nullable: true,
    cascade: ['remove'],
  })
  tasks: Task[];
  @ManyToOne(() => User, (user) => user.boards, { nullable: true })
  user: User;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  color: string;
  @ManyToOne(() => Category, (category) => category.boards, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  category: Category;
  @Column({ nullable: true })
  categoryId: number;
}
