import {
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

@Injectable()
export class ThumbnailValidationPipe extends ParseFilePipe {
  constructor() {
    super({
      fileIsRequired: true,
      validators: [
        new FileTypeValidator({
          fileType: 'image',
        }),
        new MaxFileSizeValidator({
          maxSize: 1024 * 1024 * 3,
        }),
      ],
    });
  }
}
