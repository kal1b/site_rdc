import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PaymentsService } from './payments.service';

@Processor('onec-sync')
export class PaymentsProcessor extends WorkerHost {
  constructor(private readonly payments: PaymentsService) { super(); }
  async process(job: Job<{ paymentId: string }>) {
    return this.payments.syncPaymentToOneC(job.data.paymentId);
  }
}
