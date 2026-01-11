import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Car } from '../cars/car.entity';

export enum UserRole {
  USER = 'USER',
  DEALER = 'DEALER', 
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hidden from GraphQL

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerLogoUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerAddress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerCity?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerPhoneNumber?: string;

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  savedListingIds: string[];

  @Field(() => [Car])
  @OneToMany(() => Car, car => car.seller)
  cars: Car[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}