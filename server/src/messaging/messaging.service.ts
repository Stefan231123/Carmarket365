import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
import { Car } from '../cars/car.entity';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Conversation) private readonly conversations: Repository<Conversation>,
    @InjectRepository(Message) private readonly messages: Repository<Message>,
    @InjectRepository(Car) private readonly cars: Repository<Car>,
  ) {}

  private assertParticipant(conv: Conversation, userId: string): void {
    if (conv.buyerId !== userId && conv.sellerId !== userId) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }
  }

  /** Unread messages in a conversation that the user did NOT send. */
  private async unreadCountFor(conversationId: string, userId: string): Promise<number> {
    return this.messages
      .createQueryBuilder('m')
      .where('m.conversationId = :conversationId', { conversationId })
      .andWhere('m.senderId != :userId', { userId })
      .andWhere('m.isRead = false')
      .getCount();
  }

  /**
   * Start a conversation about a listing (or return the existing one) and post
   * the first message. The seller is derived from the car; a user cannot start a
   * conversation with themselves.
   */
  async startConversation(carId: string, content: string, buyerId: string): Promise<Conversation> {
    const body = content?.trim();
    if (!body) throw new BadRequestException('Message content is required');

    const car = await this.cars.findOne({ where: { id: carId } });
    if (!car) throw new NotFoundException('Car not found');
    if (car.sellerId === buyerId) {
      throw new BadRequestException('You cannot start a conversation on your own listing');
    }

    let conv = await this.conversations.findOne({
      where: { carId, buyerId, sellerId: car.sellerId },
    });
    if (!conv) {
      conv = await this.conversations.save(
        this.conversations.create({ carId, buyerId, sellerId: car.sellerId, lastMessageAt: new Date() }),
      );
    }

    await this.postMessage(conv.id, buyerId, body);
    return this.getConversation(conv.id, buyerId);
  }

  /** Post a message to an existing conversation (participants only). */
  async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const body = content?.trim();
    if (!body) throw new BadRequestException('Message content is required');

    const conv = await this.conversations.findOne({ where: { id: conversationId } });
    if (!conv) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conv, senderId);

    return this.postMessage(conversationId, senderId, body);
  }

  private async postMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const msg = await this.messages.save(
      this.messages.create({ conversationId, senderId, content, isRead: false }),
    );
    await this.conversations.update(conversationId, { lastMessageAt: new Date() });
    return msg;
  }

  /** Conversations the user participates in, newest activity first, with unread counts. */
  async getMyConversations(userId: string): Promise<Conversation[]> {
    const rows = await this.conversations.find({
      where: [{ buyerId: userId }, { sellerId: userId }],
      order: { lastMessageAt: 'DESC' },
    });
    for (const c of rows) {
      c.unreadCount = await this.unreadCountFor(c.id, userId);
    }
    return rows;
  }

  /** A single conversation with its messages (participants only). */
  async getConversation(id: string, userId: string): Promise<Conversation> {
    const conv = await this.conversations.findOne({
      where: { id },
      relations: ['messages', 'messages.sender'],
      order: { messages: { createdAt: 'ASC' } },
    });
    if (!conv) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conv, userId);
    conv.unreadCount = await this.unreadCountFor(id, userId);
    return conv;
  }

  /** Mark every message the user did NOT send as read. Returns count updated. */
  async markRead(conversationId: string, userId: string): Promise<number> {
    const conv = await this.conversations.findOne({ where: { id: conversationId } });
    if (!conv) throw new NotFoundException('Conversation not found');
    this.assertParticipant(conv, userId);

    const res = await this.messages
      .createQueryBuilder()
      .update(Message)
      .set({ isRead: true })
      .where('conversationId = :conversationId', { conversationId })
      .andWhere('senderId != :userId', { userId })
      .andWhere('isRead = false')
      .execute();
    return res.affected ?? 0;
  }

  /** Total unread messages across all the user's conversations. */
  async totalUnread(userId: string): Promise<number> {
    return this.messages
      .createQueryBuilder('m')
      .innerJoin(Conversation, 'c', 'c.id = m.conversationId')
      .where('(c.buyerId = :userId OR c.sellerId = :userId)', { userId })
      .andWhere('m.senderId != :userId', { userId })
      .andWhere('m.isRead = false')
      .getCount();
  }
}
