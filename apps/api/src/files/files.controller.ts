import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesService } from './files.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private service: FilesService) {}

  @Post('files/presign')
  presign(@Body() body: { fileName: string; contentType: string }) {
    return this.service.presign(body.fileName, body.contentType);
  }

  @Post('applications/:id/documents')
  attach(@Param('id') id: string, @Body() body: { typeKey: string; fileKey: string }) {
    return this.service.attachDocument(id, body.typeKey, body.fileKey);
  }
}
