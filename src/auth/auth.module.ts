import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'GOOGLE_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new OAuth2Client({
          clientId: configService.get('GOOGLE_CLIENT_ID'),
          clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
        });
      },
    },
  ],
})
export class AuthModule {}
