import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  id?: string;

  @IsBoolean({ message: 'Must be a boolean' })
  isActive?: boolean;

  @IsBoolean({ message: 'Must be a boolean' })
  isArchived?: boolean;

  @IsDate({ message: 'Must be a date' })
  createDateTime?: Date;

  @IsString({ message: 'Must be a string' })
  createdBy?: string;

  @IsDate({ message: 'Must be a date' })
  lastChangedDateTime?: Date;

  @IsString({ message: 'Must be a string' })
  lastChangedBy?: string;

  internalComment?: string | null;
}
