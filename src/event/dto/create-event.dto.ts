import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
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

  @Type(() => Date)
  @ApiProperty({
    example: '2022-05-30',
  })
  @IsDate()
  start_date?: Date;

  @Type(() => Date)
  @ApiProperty({
    example: '2022-06-25',
  })
  @IsDate()
  end_date: Date;
}
