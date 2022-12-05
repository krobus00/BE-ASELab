import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'ASELab Open Recruitment 2022',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: ['Recruitment'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  tags: string[];

  @ApiPropertyOptional({
    example: 'Telah dibuka open recruitment anggota baru ASELab 2022',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2022-05-30',
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({
    example: '2022-06-27',
  })
  @IsDateString()
  end_date: string;
}
