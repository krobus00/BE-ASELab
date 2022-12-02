import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    @Inject('GOOGLE_CLIENT') private googleClient: OAuth2Client,
  ) {}

  async googleLogin(token: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: this.config.get('GOOGLE_CLIENT_ID'),
    });

    return ticket;
  }
}
