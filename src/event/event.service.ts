import { AwsS3Service } from './../aws/aws-s3.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService, private s3: AwsS3Service) {}

  async createEventPost(
    userId: string,
    dto: CreateEventDto,
    thumbnail: Express.Multer.File,
  ) {
    const { title, description, start_date, end_date, tags } = dto;

    const s3Response = await this.s3.uploadFile(thumbnail);

    const signedThumbnailUrl = await this.s3.getSignedUrl(s3Response.Key);

    const event = await this.prisma.event.create({
      data: {
        title,
        description,
        tags,
        end_date,
        start_date: start_date ?? new Date(),
        created_by_id: userId,
        updated_by_id: userId,
        thumbnail_url: signedThumbnailUrl,
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

  async updateEventById(userId: string, id: number, dto: CreateEventDto) {
    const event = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        ...dto,
        updated_by_id: userId,
      },
    });

    return event;
  }
}
