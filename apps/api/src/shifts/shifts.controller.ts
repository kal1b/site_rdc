import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShiftsService } from './shifts.service';

@Controller('shifts')
export class ShiftsController {
  constructor(private service: ShiftsService) {}
  @Get() list(@Query() q: any) { return this.service.list(q); }
  @Get(':id') one(@Param('id') id: string) { return this.service.one(id); }
}
