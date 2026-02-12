import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CampsService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.camp.findMany({ where: { isActive: true } }); }
  bySlug(slug: string) { return this.prisma.camp.findUnique({ where: { slug } }); }
}
