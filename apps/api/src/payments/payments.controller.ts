import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('create') create(@Body('applicationId') applicationId: string) { return this.service.create(applicationId); }
  @Post('webhook/:provider') webhook(@Param('provider') provider: string, @Body() body: any) { return this.service.webhook(provider, body); }
  @Post('test/succeed') test(@Body('paymentId') paymentId: string) { return this.service.testSucceed(paymentId); }
}
