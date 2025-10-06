import { Module } from '@nestjs/common';
import { UrgencyService } from './urgencia.service';

@Module({
  providers: [UrgencyService]
})
export class UrgencyModule {}
