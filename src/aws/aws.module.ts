import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { AwsS3Service } from './aws-s3.service';

@Global()
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
  exports: [AwsS3Service],
})
export class AwsModule {}
