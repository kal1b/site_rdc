import { Controller, Param, Post } from '@nestjs/common';
import { PaymentsService } from '../payments/payments.service';

@Controller('integrations/onec')
export class IntegrationsController {
  constructor(private payments: PaymentsService) {}
  @Post('sync/payment/:paymentId')
  sync(@Param('paymentId') paymentId: string) {
    return this.payments.syncPaymentToOneC(paymentId);
  }
}
