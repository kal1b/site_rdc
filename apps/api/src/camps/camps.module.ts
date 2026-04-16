import { Module } from '@nestjs/common';
import { CampsController } from './camps.controller';
import { CampsService } from './camps.service';
import { PrismaService } from '../common/prisma.service';

@Module({ controllers: [CampsController], providers: [CampsService, PrismaService], exports: [CampsService] })
export class CampsModule {}
