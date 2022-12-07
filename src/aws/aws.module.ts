import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { ConfigService } from '@nestjs/config';
import { AwsController } from './aws.controller';
import { S3 } from 'aws-sdk';

@Module({
  providers: [
    AwsS3Service,
    {
      provide: 'AWS_S3_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): S3 => {
        const awsS3 = new S3({
          credentials: {
            accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: configService.get('AWS_S3_KEY_SECRET'),
          },
          endpoint: configService.get('AWS_S3_ENDPOINT'),
        });

        return awsS3;
      },
    },
  ],
  controllers: [AwsController],
})
export class AwsModule {}