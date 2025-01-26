import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { UserStatus } from '../../userStatus/entities/userStatus.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from '../../utils/entity-helper';
import { Exclude, Expose } from 'class-transformer';
import { Category } from '../../categories/entities/category.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Priority } from '../../priorities/entities/priority.entity';
import { Board } from '../../boards/entities/board.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';
@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  image: string | null;
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Column({ type: String, nullable: true })
  about: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => UserStatus, {
    eager: true,
  })
  status?: UserStatus;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Category, (category) => category.user, { nullable: true })
  categories: Category[];

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];
  @OneToMany(() => Priority, (priority) => priority.user, { cascade: true })
  priorities: Priority[];
  @OneToMany(() => Board, (board) => board.user, { nullable: true })
  boards: Board[];
  @OneToMany(() => Tag, (tag) => tag.user, { nullable: true })
  tags: Tag[];
}
