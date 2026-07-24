import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
import { MessagingService } from './messaging.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Resolver(() => Conversation)
@UseGuards(JwtAuthGuard)
export class MessagingResolver {
  constructor(private readonly messaging: MessagingService) {}

  @Query(() => [Conversation], { name: 'getMyConversations', description: 'Conversations the current user participates in' })
  getMyConversations(@CurrentUser() user: User): Promise<Conversation[]> {
    return this.messaging.getMyConversations(user.id);
  }

  @Query(() => Conversation, { name: 'getConversation', description: 'A single conversation with its messages (participants only)' })
  getConversation(@Args('id') id: string, @CurrentUser() user: User): Promise<Conversation> {
    return this.messaging.getConversation(id, user.id);
  }

  @Query(() => Int, { name: 'getUnreadMessageCount', description: 'Total unread messages across all conversations' })
  getUnreadMessageCount(@CurrentUser() user: User): Promise<number> {
    return this.messaging.totalUnread(user.id);
  }

  @Mutation(() => Conversation, { description: 'Start (or resume) a conversation about a listing with a first message' })
  @Throttle({ default: { ttl: 60000, limit: 20 } })
  startConversation(
    @Args('carId') carId: string,
    @Args('content') content: string,
    @CurrentUser() user: User,
  ): Promise<Conversation> {
    return this.messaging.startConversation(carId, content, user.id);
  }

  @Mutation(() => Message, { description: 'Send a message to an existing conversation' })
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
    @CurrentUser() user: User,
  ): Promise<Message> {
    return this.messaging.sendMessage(conversationId, user.id, content);
  }

  @Mutation(() => Int, { description: 'Mark all messages in a conversation as read; returns how many were updated' })
  markConversationRead(@Args('conversationId') conversationId: string, @CurrentUser() user: User): Promise<number> {
    return this.messaging.markRead(conversationId, user.id);
  }
}
