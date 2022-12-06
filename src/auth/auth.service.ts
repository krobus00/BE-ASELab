import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleLoginDto } from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    @Inject('GOOGLE_CLIENT') private googleClient: OAuth2Client,
    private jwt: JwtService,
  ) {}

  async googleLogin(dto: GoogleLoginDto) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: dto.idToken,
      audience: this.config.get('GOOGLE_CLIENT_ID'),
    });

    const { sub, email, name, picture } = ticket.getPayload();

    const user = await this.upsertUser(sub, email, name, picture);

    const tokens = this.generateTokens({ sub, email, role: user.role.name });

    return tokens;
  }

  async upsertUser(
    sub: string,
    email: string,
    name?: string,
    picture?: string,
  ) {
    return this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id: sub,
        email,
        name,
        photo_url: picture,
        role: {
          connectOrCreate: {
            where: { name: 'Guest' },
            create: { name: 'Guest' },
          },
        },
      },
      select: {
        id: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }
}
