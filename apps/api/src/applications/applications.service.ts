import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { DraftApplicationDto } from './dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async draft(userId: string, dto: DraftApplicationDto) {
    if (dto.applicationId) {
      const existing = await this.prisma.application.findUnique({ where: { id: dto.applicationId } });
      if (!existing || existing.userId !== userId) throw new ForbiddenException();
      return this.prisma.application.update({ where: { id: dto.applicationId }, data: { ...dto, status: ApplicationStatus.DRAFT } });
    }
    return this.prisma.application.create({ data: { userId, shiftId: dto.shiftId, childJson: dto.childJson, parentJson: dto.parentJson } });
  }

  async submit(userId: string, id: string) {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app || app.userId !== userId) throw new ForbiddenException();
    return this.prisma.application.update({ where: { id }, data: { status: ApplicationStatus.SUBMITTED } });
  }

  my(userId: string) { return this.prisma.application.findMany({ where: { userId }, include: { shift: true, payments: true, documents: true } }); }
  async byId(userId: string, id: string) {
    const app = await this.prisma.application.findUnique({ where: { id }, include: { documents: true, payments: true } });
    if (!app || app.userId !== userId) throw new ForbiddenException();
    return app;
  }
}
