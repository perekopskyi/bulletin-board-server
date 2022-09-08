import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserDto } from '../../database/dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users (remove password from response)' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserDto] })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Create user (remove password from response)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body()
    userDto: CreateUserDto,
  ) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Get user by id (remove password from response)' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update user by id (remove password from response)',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  update(@Param('userId') userId: string, @Body() userDto: UserDto) {
    return this.usersService.update(userId, userDto);
  }

  @ApiOperation({
    summary: 'Delete user by id (remove password from response)',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId);
  }
}
