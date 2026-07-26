import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
import { Car } from '../cars/car.entity';
import { User } from '../users/user.entity';
import { MessagingService } from './messaging.service';
import { MessagingResolver } from './messaging.resolver';
import { EmailModule } from '../common/email/email.module';
import { PushModule } from '../common/push/push.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message, Car, User]), EmailModule, PushModule],
  providers: [MessagingService, MessagingResolver],
  exports: [MessagingService],
})
export class MessagingModule {}
