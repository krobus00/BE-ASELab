import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async findAllActiveMember() {
    return this.prisma.user.findMany({
      where: {
        NOT: {
          division_id: null,
          deleted_at: null,
        },
      },
    });
  }
}
