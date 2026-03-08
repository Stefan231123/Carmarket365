import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from '../email/email.service';

@Resolver()
export class SubscribersResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean, { description: 'Subscribe an email to mobile app launch notifications via Resend Audiences.' })
  async subscribeToMobileApp(
    @Args('email') email: string,
  ): Promise<boolean> {
    return this.emailService.subscribeToAudience(email);
  }
}
