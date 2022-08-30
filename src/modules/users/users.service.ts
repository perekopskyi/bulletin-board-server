import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePasswords } from '../../shared/comparePasswords';
import { toUserDto } from '../../shared/mapper';
import {
  CreateUserDto,
  LoginUserDto,
  UserDto,
} from '../../database/dto/user.dto';
import { UsersEntity } from '../../database/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async create(userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);
    return await this.userRepository.save(createdUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => toUserDto(user));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) return toUserDto(user);

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

    if (!user) {
      throw new NotFoundException(
        `User with username = '${username}' was not found`,
      );
    }

    return user;
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async isLoginExists(username: string) {
    const user = await this.findByUsername(username);
    if (user) {
      throw new BadRequestException(
        `User with username = ${username} already exists`,
      );
    }
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.userRepository.findOneBy({ username });
  }
}
