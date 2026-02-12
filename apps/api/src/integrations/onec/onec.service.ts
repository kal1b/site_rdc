import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OneCService {
  private readonly logger = new Logger(OneCService.name);
  private readonly base = process.env.MOCK_1C_URL || 'http://mock1c:3100';

  async syncPayment(payload: any) {
    const inv = await fetch(`${this.base}/odata/invoices`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload.invoice) });
    const pay = await fetch(`${this.base}/odata/payments`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload.payment) });
    if (!inv.ok || !pay.ok) {
      this.logger.error('1C sync failed');
      throw new Error('1C sync failed');
    }
    return { invoice: await inv.json(), payment: await pay.json() };
  }
}
