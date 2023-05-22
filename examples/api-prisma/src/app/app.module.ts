import { Module } from '@nestjs/common';

import { TraxionModule } from '../generated/modules/traxion.module';

@Module({
  imports: [TraxionModule],
})
export class AppModule {}
