import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsOptional, IsString, } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        example: 'The Dire'
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        example: 'Developed by The DAG Team (Dean Arsyel Galih), The Dire tells the story about a boy who is trying to find a way'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    thumbnail: string;

    @ApiProperty({
        example: ['Game'],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    tags: string[];

    @ApiProperty({
        example: 'ASLAB 1',
    })
    @IsString()
    published_by_id: string;

    @ApiProperty({
        example: 'by The DAG Team',
    })
    @IsString()
    created_by_id: string;

    @ApiProperty({
        example: 'ASLAB 2',
    })
    @IsString()
    updated_by_id: string;
}