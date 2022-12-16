import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsOptional, IsString, IsDate} from 'class-validator';

export class CreateBlogDto {
    @ApiProperty({
        example: '3 Pelatihan Excel DQLab, Siap Jadi Jagoan Data'
    })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        example: 'Excel atau yang dikenal juga dengan Microsoft Excel merupakan salah satu software spreadsheet yang menjadi favorit...'
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsString()
    thumbnail: string;

    @ApiProperty({
        example: ['Competition']
    })
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @Transform(({ value }) => {
        return value.trim().split(',');
    })
    tags: string[];

    @Type(() => Date)
    @IsDate()
    blog_date?: Date;

    @ApiPropertyOptional({
        example: '3m read'
    })
    @IsOptional()
    @IsString()
    estimated_read_time?: string;

}