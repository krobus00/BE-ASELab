import { EventService } from './event.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetUserId } from 'src/auth/decorators';
import { CreateEventDto } from './dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEventPost(
    @GetUserId() userId: string,
    @Body() dto: CreateEventDto,
  ) {
    return this.eventService.createEventPost(userId, dto);
  }

  @Get()
  async getAllEvents(@Query('limit') limit: number) {
    return this.eventService.getAllEvents(limit);
  }

  @Delete('/:id')
  async deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEventById(id);
  }
}
