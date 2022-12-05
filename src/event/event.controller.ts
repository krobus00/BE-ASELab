import { EventService } from './event.service';
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
  UseGuards,
} from '@nestjs/common';
import { GetUserId, Roles } from 'src/auth/decorators';
import { CreateEventDto, UpdateEventDto } from './dto';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @ApiBearerAuth()
  async createEventPost(
    @GetUserId() userId: string,
    @Body() dto: CreateEventDto,
  ) {
    return this.eventService.createEventPost(userId, dto);
  }

  @Get()
  async getAllEvents(@Query('limit', ParseIntPipe) limit: number) {
    return this.eventService.getAllEvents(limit);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @ApiBearerAuth()
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.deleteEventById(id);
  }

  @Put('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @ApiBearerAuth()
  async updateEvent(
    @GetUserId() userId: string,
    @Param('id', ParseIntPipe) id: number,
    dto: UpdateEventDto,
  ) {
    return this.eventService.updateEventById(userId, id, dto);
  }
}
