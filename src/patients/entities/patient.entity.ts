import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Patient {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ type: 'date' })
  dob: Date;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  guardianName: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Field()
  @Column({ type: 'int' })
  age: number;

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  healthProblems: string[];

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  medication: string[];

  @Field()
  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'timestamptz' })
  deletedAt: Date;
}
