import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Tag extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[];
  @ManyToOne(() => User, (user) => user.tags, { nullable: true })
  user: User;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  color: string;
}
