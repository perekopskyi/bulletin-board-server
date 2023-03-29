import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Like, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UserDto } from '../users/user.dto';
import { comparePasswords } from '../../shared/comparePasswords';
import { SessionEntity } from '../session/session.entity';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces';
import { PostgresErrorCode } from '../../database/postgresErrorCodes.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public getCookieWithJwtAccessToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return { cookie, refreshToken };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);
    return user;
  }

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    try {
      await this.usersService.create(userDto);
      return {
        success: true,
        message: 'user registered',
      };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with that email already exists');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async validateUser({ userId }: TokenPayload): Promise<UserDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);

      const isPasswordMatching = await comparePasswords(
        user.password,
        hashedPassword,
      );

      if (!isPasswordMatching) {
        throw new BadRequestException('Wrong credentials provided');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const user = await this.usersService.findOne(userId);

    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const session = this.sessionRepository.create({
      currentHashedRefreshToken,
      user,
    });
    return await this.sessionRepository.save(session);
  }

  async deleteSessionByUserId(userId: string): Promise<void> {
    const session = await this.sessionRepository.findOne({
      where: {
        user: Like(userId),
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.sessionRepository.remove(session);
  }
}
