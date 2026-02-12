import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { PrismaService } from '../common/prisma.service';

@Module({ controllers: [ShiftsController], providers: [ShiftsService, PrismaService] })
export class ShiftsModule {}
