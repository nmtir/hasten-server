import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { AllConfigType } from 'src/config/config.type';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
  ): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix', { infer: true })}/v1/${
        file.path
      }`,
      s3: (file as Express.MulterS3.File).location,
    };

    return this.fileRepository.save(
      this.fileRepository.create({
        path: path[
          this.configService.getOrThrow('file.driver', { infer: true })
        ],
      }),
    );
  }
  async uploadImage(
    file: Express.Multer.File | Express.MulterS3.File,
    id: number,
  ): Promise<string | null> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    cloudinary.config({
      cloud_name: this.configService.get('app.cloudinaryCloudName', {
        infer: true,
      }),
      api_key: this.configService.get('app.cloudinaryApiKey', {
        infer: true,
      }),
      api_secret: this.configService.get('app.cloudinaryApiSecret', {
        infer: true,
      }),
    });
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: file.filename,
      })
      .catch((error) => {
        console.log(error);
      });
    if (uploadResult) return uploadResult.url;
    return null;
  }
}
