import { Module } from '@nestjs/common';
import { SubscribersResolver } from './subscribers.resolver';

@Module({
  providers: [SubscribersResolver],
})
export class SubscribersModule {}
