import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty({})
  @IsString()
  idToken: string;
}
