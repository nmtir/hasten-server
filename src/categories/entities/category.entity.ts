import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Category extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  subtitle: string;
  @Column({ nullable: true })
  status: string;
  @Column({ nullable: true })
  label: string;
  @Column({ nullable: true })
  priority: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  percentage: number;
  @ManyToOne(() => User, (user) => user.boards, { nullable: true })
  user: User;
  @Column({ nullable: true })
  logo: string;
  @Column({ nullable: true })
  isFavorite: boolean;
  @Column({ nullable: true })
  userId: number;
  @OneToMany(() => Board, (board) => board.category, {
    nullable: true,
    cascade: ['remove'],
  })
  boards: Board[];
  @OneToMany(() => Task, (task) => task.category, {
    nullable: true,
    cascade: ['remove'],
  })
  tasks: Task[];
  @Column({ nullable: true })
  color: string;
}
