import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ShiftsService {
  constructor(private prisma: PrismaService) {}
  list(query: any) {
    return this.prisma.shift.findMany({
      where: {
        camp: query.campSlug ? { slug: query.campSlug } : undefined,
        ageMin: query.age ? { lte: Number(query.age) } : undefined,
        ageMax: query.age ? { gte: Number(query.age) } : undefined
      },
      include: { camp: true }
    });
  }
  one(id: string) { return this.prisma.shift.findUnique({ where: { id }, include: { camp: true } }); }
}
