import { RolesGuard } from './guards/roles.guard';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    RolesGuard,
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
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN'),
        },
      }),
    }),
  ],
})
export class AuthModule {}
