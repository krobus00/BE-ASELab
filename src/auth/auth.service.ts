import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    @Inject('GOOGLE_CLIENT') private googleClient: OAuth2Client,
    private jwt: JwtService,
  ) {}

  async googleLogin(token: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: this.config.get('GOOGLE_CLIENT_ID'),
    });

    const { sub, email } = ticket.getPayload();

    const tokens = this.generateTokens({ sub, email });

    return tokens;
  }

  async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }
}
