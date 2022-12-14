import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  constructor(
    @Inject('AWS_S3_CLIENT') private S3Client: S3,
    private config: ConfigService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const { originalname, buffer, mimetype } = file;

    const params: S3.PutObjectRequest = {
      Bucket: this.config.get('AWS_S3_BUCKET'),
      Key: originalname,
      Body: buffer,
      ACL: 'private',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    return await this.S3Client.upload(params).promise();
  }

  async getSignedUrl(key: string) {
    return await this.S3Client.getSignedUrlPromise('getObject', {
      Bucket: this.config.get('AWS_S3_BUCKET'),
      Key: key,
      Expires: 60 * 60,
    });
  }

  async getFile(key: string) {
    const params: S3.GetObjectRequest = {
      Bucket: this.config.get('AWS_S3_BUCKET'),
      Key: key,
    };

    return await this.S3Client.getObject(params).promise();
  }
}
