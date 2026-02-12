import { Controller, Get, Param } from '@nestjs/common';
import { CampsService } from './camps.service';

@Controller('camps')
export class CampsController {
  constructor(private service: CampsService) {}
  @Get() list() { return this.service.list(); }
  @Get(':slug') one(@Param('slug') slug: string) { return this.service.bySlug(slug); }
}
