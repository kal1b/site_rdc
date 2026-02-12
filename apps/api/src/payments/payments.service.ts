import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationStatus, PaymentStatus } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { OneCService } from '../integrations/onec/onec.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService, @InjectQueue('onec-sync') private queue: Queue, private onec: OneCService) {}

  async create(applicationId: string) {
    const app = await this.prisma.application.findUnique({ where: { id: applicationId } });
    if (!app) throw new NotFoundException('Application not found');
    return this.prisma.payment.create({ data: { applicationId, amount: 30000, currency: 'RUB', status: PaymentStatus.PENDING } });
  }

  async webhook(provider: string, body: any) {
    if (body?.event === 'payment.succeeded' && body?.paymentId) {
      return this.markSucceeded(body.paymentId);
    }
    return { ok: true, provider };
  }

  async testSucceed(paymentId: string) { return this.markSucceeded(paymentId); }

  private async markSucceeded(paymentId: string) {
    const payment = await this.prisma.payment.update({ where: { id: paymentId }, data: { status: PaymentStatus.SUCCEEDED } });
    await this.prisma.application.update({ where: { id: payment.applicationId }, data: { status: ApplicationStatus.PAID } });
    await this.queue.add('sync-payment', { paymentId }, { attempts: 3, backoff: { type: 'fixed', delay: 1000 } });
    return payment;
  }

  async syncPaymentToOneC(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId }, include: { application: { include: { user: true, shift: { include: { camp: true } } } } } });
    if (!payment) throw new NotFoundException();
    return this.onec.syncPayment({
      invoice: { applicationId: payment.applicationId, camp: payment.application.shift.camp.name, shift: payment.application.shift.title, customer: payment.application.user.email, amount: payment.amount },
      payment: { paymentId: payment.id, amount: payment.amount, status: payment.status }
    });
  }
}
