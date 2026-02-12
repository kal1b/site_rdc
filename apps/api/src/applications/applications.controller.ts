import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { DraftApplicationDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private service: ApplicationsService) {}
  @Post('draft') draft(@Req() req: any, @Body() dto: DraftApplicationDto) { return this.service.draft(req.user.sub, dto); }
  @Post('submit') submit(@Req() req: any, @Body('applicationId') applicationId: string) { return this.service.submit(req.user.sub, applicationId); }
  @Get('my') my(@Req() req: any) { return this.service.my(req.user.sub); }
  @Get(':id') byId(@Req() req: any, @Param('id') id: string) { return this.service.byId(req.user.sub, id); }
}
