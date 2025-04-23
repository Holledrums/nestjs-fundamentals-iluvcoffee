import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { CustomParseIntPipe } from './pipes/parse-int/parse-int.pipe';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    CustomParseIntPipe,
  ],
  exports: [ConfigModule, CustomParseIntPipe],
})
export class CommonModule {}
