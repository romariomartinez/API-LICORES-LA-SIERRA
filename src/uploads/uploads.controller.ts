import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@ApiTags('uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('uploads')
export class UploadsController {
  constructor(private service: UploadsService) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadImage(file);
  }
}
