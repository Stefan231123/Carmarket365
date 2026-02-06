import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Car } from './car.entity';

@ObjectType()
@Entity('car_images')
export class CarImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  altText?: string;

  @Field(() => Int)
  @Column({ default: 0 })
  sortOrder: number;

  @Field()
  @Column({ default: false })
  isMain: boolean; // Primary image for the listing

  @Field()
  @Column({ default: false })
  isInterior: boolean; // Interior vs exterior photo

  @Field({ nullable: true })
  @Column({ nullable: true })
  originalFileName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fileSize?: number; // in bytes

  @Field({ nullable: true })
  @Column({ nullable: true })
  mimeType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  height?: number;

  @Column()
  carId: string;

  @Field(() => Car)
  @ManyToOne(() => Car, car => car.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}