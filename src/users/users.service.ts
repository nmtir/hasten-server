import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
  // Get contacts for a user based on fields condition
  async getContacts(
    fields: EntityCondition<User>,
  ): Promise<NullableType<User[]>> {
    try {
      // Assuming 'contacts' is a ManyToMany relation in the 'User' entity
      const user = await this.usersRepository.findOne({
        where: fields,
        relations: ['contacts'], // Make sure to include the 'contacts' relation
      });

      // If no user is found with the provided fields, return null
      if (!user) {
        return null;
      }

      // Return the contacts of the user
      return [];
    } catch (error) {
      // Handle any errors (e.g. database issues)
      console.error('Error fetching contacts:', error);
      throw new Error('Could not retrieve contacts.');
    }
  }
}
