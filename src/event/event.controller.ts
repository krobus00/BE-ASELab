import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUserId, Roles } from 'src/auth/decorators';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { ThumbnailValidationPipe } from 'src/common/pipes';
import { CreateEventDto, UpdateEventDto } from './dto';
import { EventService } from './event.service';

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', nullable: false },
        description: { type: 'string' },
        start_date: { type: 'string', format: 'date-time', nullable: false },
        end_date: { type: 'string', format: 'date-time', nullable: false },
        tags: {
          type: 'array',
          minItems: 1,
          uniqueItems: true,
          items: {
            type: 'string',
            example: 'tag1',
          },
        },
        thumbnail: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async createEventPost(
    @GetUserId() userId: string,
    @Body() dto: CreateEventDto,
    @UploadedFile(new ThumbnailValidationPipe())
    thumbnail: Express.Multer.File,
  ) {
    return this.eventService.createEventPost(userId, dto, thumbnail);
  }

  @Get()
  async getAllEvents(@Query('limit', ParseIntPipe) limit: number) {
    return this.eventService.getAllEvents(limit);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @ApiBearerAuth()
  async deleteEventPost(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.deleteEventById(id);
  }

  @Put('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @UseInterceptors(FileInterceptor('thumbnail'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', nullable: false },
        description: { type: 'string' },
        start_date: { type: 'string', format: 'date-time', nullable: false },
        end_date: { type: 'string', format: 'date-time', nullable: false },
        tags: {
          type: 'array',
          minItems: 1,
          uniqueItems: true,
          items: {
            type: 'string',
            example: 'tag1',
          },
        },
        thumbnail: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateEventPost(
    @GetUserId() userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEventDto,
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
  ) {
    return this.eventService.updateEventById(userId, id, dto, thumbnail);
  }
}
