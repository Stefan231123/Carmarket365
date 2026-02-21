import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field({ nullable: true, deprecationReason: 'Use httpOnly cookie instead' })
  access_token?: string;
}