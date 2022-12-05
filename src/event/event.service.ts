import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEventPost(userId: string, dto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: {
        ...dto,
        created_by_id: userId,
        updated_by_id: userId,
      },
    });

    return event;
  }

  async getAllEvents(limit: number) {
    const events = await this.prisma.event.findMany({
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });

    return events;
  }

  async deleteEventById(id: number) {
    const event = await this.prisma.event.delete({
      where: {
        id,
      },
    });

    return event;
  }
}
