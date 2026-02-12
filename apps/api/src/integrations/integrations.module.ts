import { Module } from '@nestjs/common';
import { OneCService } from './onec/onec.service';
import { IntegrationsController } from './integrations.controller';
import { PaymentsModule } from '../payments/payments.module';

@Module({ imports: [PaymentsModule], providers: [OneCService], controllers: [IntegrationsController], exports: [OneCService] })
export class IntegrationsModule {}
