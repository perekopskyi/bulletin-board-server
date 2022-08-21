import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../../database/entities/dto/user.dto';
import { UsersEntity } from '../../database/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async create(userDto: UserDto) {
    const createdUser = this.userRepository.create(userDto);
    return await this.userRepository.save(createdUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) return user;

    throw new NotFoundException(`User with id = ${id} was not found`);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }

  async update(id: string, userDto: UserDto) {
    if (userDto.id) delete userDto.id;
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (userDto.username !== updatedUser.username) {
      await this.isLoginExists(userDto.username);
    }

    if (updatedUser) {
      Object.assign(updatedUser, userDto);
      return await this.userRepository.save(updatedUser);
    }

    throw new NotFoundException(`User with id = ${id} was not found`);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (user) return user;
  }

  async isLoginExists(username: string) {
    const user = await this.findByUsername(username);
    if (user) {
      throw new BadRequestException(
        `User with username = ${username} already exists`,
      );
    }
  }
}
