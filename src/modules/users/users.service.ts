import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserDto,
} from './user.dto';
import { SchemaUserinfo } from '../auth/interfaces';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.findOne(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async create(userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);
    return await this.userRepository.save(createdUser);
  }

  async createWithGoogle(userBody: SchemaUserinfo) {
    const newUser = this.userRepository.create(userBody);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: {
        posts: true,
      },
    });
    return users.map((user) => user);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (user) return user;

    throw new NotFoundException(`User with id = ${id} was not found`);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }

  async update(id: string, userDto: UpdateUserDto) {
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
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email = '${email}' was not found`);
    }

    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.verifyPassword(password, user.password);

    return user;
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.userRepository.findOneBy({ username });
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
