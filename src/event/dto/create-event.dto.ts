import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  tags: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}
