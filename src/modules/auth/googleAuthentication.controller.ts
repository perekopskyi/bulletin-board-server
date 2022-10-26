import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TokenVerificationDto } from './tokenVerification.dto';
import { GoogleAuthenticationService } from './googleAuthentication.service';

@ApiTags('OAuth')
@Controller('google')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @HttpCode(200)
  @Post()
  async authenticate(
    @Body() body: TokenVerificationDto,
    @Req() request: Request,
  ) {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.googleAuthenticationService.authenticate(body.token);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return { user };
  }
}
