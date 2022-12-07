import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Transform(({ value }) => {
    return value.trim().split(',');
  })
  tags: string[];

  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @Type(() => Date)
  @IsDate()
  end_date: Date;
}
