import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Priority extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  color: string;
  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column({ nullable: true })
  label?: string;
  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column({ nullable: true })
  value?: string;
  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column({ nullable: true })
  icon?: string;

  @OneToMany(() => Task, (task) => task.priority, {
    nullable: true,
  })
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.priorities, { nullable: true })
  user: User;
  @Column({ nullable: true })
  userId: number;
}
