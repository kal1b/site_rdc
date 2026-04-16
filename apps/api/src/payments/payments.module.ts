import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsProcessor } from './payments.processor';
import { PrismaService } from '../common/prisma.service';
import { IntegrationsModule } from '../integrations/integrations.module';
import { OneCService } from '../integrations/onec/onec.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'onec-sync' }), forwardRef(() => IntegrationsModule)],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsProcessor, PrismaService, OneCService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
