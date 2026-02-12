import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './auth/auth.module';
import { CampsModule } from './camps/camps.module';
import { ShiftsModule } from './shifts/shifts.module';
import { ApplicationsModule } from './applications/applications.module';
import { FilesModule } from './files/files.module';
import { PaymentsModule } from './payments/payments.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({ connection: { url: process.env.REDIS_URL } }),
    AuthModule,
    CampsModule,
    ShiftsModule,
    ApplicationsModule,
    FilesModule,
    PaymentsModule,
    IntegrationsModule,
    HealthModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
