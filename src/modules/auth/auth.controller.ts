import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { LogoutStatus } from './interfaces/login-status.interface';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.authService.login(loginUserDto);
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie, refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [accessTokenCookie, cookie]);
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  public async logout(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<Response> {
    await this.authService.deleteSessionByUserId(request.body.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    const logoutResponse: LogoutStatus = {
      message: 'Successful',
      status: response.statusCode,
    };
    return response.send(logoutResponse);
  }

  @Post('signup')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
