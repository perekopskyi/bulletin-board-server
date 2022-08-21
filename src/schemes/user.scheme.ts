import { ApiProperty } from '@nestjs/swagger';

export class UserScheme {
  @ApiProperty({
    example: 'b58a258a-1a2f-11ed-861d-0242ac120002',
    description: 'UserId as UUID',
  })
  id: string;

  @ApiProperty({
    example: 'Max-T',
    description: 'Unique username of the user',
  })
  login!: string;
}
