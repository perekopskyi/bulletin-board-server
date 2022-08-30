import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserDto,
  LoginUserDto,
  UserDto,
} from '../../database/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    try {
      await this.usersService.create(userDto);
      return {
        success: true,
        message: 'user registered',
      };
    } catch (error) {
      const message = error?.detail || error;
      return {
        success: false,
        message,
      };
    }
  }

  async validateUser({ username }: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
