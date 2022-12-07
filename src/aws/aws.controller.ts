import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { AwsS3Service } from './aws-s3.service';

@Controller('aws')
export class AwsController {
  constructor(private readonly S3Service: AwsS3Service) {}

  @Post('upload')
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.S3Service.uploadFile(file);
  }
}
