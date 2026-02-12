import { Test } from '@nestjs/testing';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  it('marks payment succeeded and enqueues sync', async () => {
    const prisma: any = {
      payment: { update: jest.fn().mockResolvedValue({ id: 'p1', applicationId: 'a1', status: 'SUCCEEDED' }) },
      application: { update: jest.fn().mockResolvedValue({}) }
    };
    const queue: any = { add: jest.fn().mockResolvedValue({}) };
    const onec: any = { syncPayment: jest.fn() };
    const module = await Test.createTestingModule({
      providers: [PaymentsService, { provide: 'BullQueue_onec-sync', useValue: queue }, { provide: 'PrismaService', useValue: prisma }, { provide: 'OneCService', useValue: onec }]
    })
      .overrideProvider(PaymentsService)
      .useFactory({
        factory: () => new PaymentsService(prisma, queue, onec)
      })
      .compile();

    const service = module.get(PaymentsService);
    await service.testSucceed('p1');
    expect(prisma.payment.update).toHaveBeenCalled();
    expect(queue.add).toHaveBeenCalledWith('sync-payment', { paymentId: 'p1' }, expect.any(Object));
  });
});
