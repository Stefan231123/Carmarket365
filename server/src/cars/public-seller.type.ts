import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole, DealerStatus } from '../users/user.entity';

@ObjectType({ description: 'Public-safe subset of a seller/dealer profile, exposed on car listings' })
export class PublicSeller {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  dealerName?: string;

  @Field(() => DealerStatus, { nullable: true })
  dealerStatus?: DealerStatus;

  @Field({ nullable: true })
  dealerLogoUrl?: string;

  @Field({ nullable: true })
  dealerDescription?: string;

  @Field({ nullable: true })
  dealerAddress?: string;

  @Field({ nullable: true })
  dealerCity?: string;

  @Field({ nullable: true })
  dealerRegion?: string;

  @Field({ nullable: true })
  dealerPostalCode?: string;

  @Field({ nullable: true })
  dealerCountry?: string;

  @Field({ nullable: true })
  dealerPhoneNumber?: string;

  @Field({ nullable: true })
  dealerWebsite?: string;

  @Field(() => [String])
  dealerWorkingHours: string[];

  @Field(() => [String])
  dealerServices: string[];

  @Field()
  createdAt: Date;
}
