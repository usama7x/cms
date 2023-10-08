import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  guardianName: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'int'})
  age: number;

  @Column({ type: 'simple-array' })
  healthProblems: string[];

  @Column({ type: 'simple-array' })
  medication: string[];

  @Column({type: 'timestamptz'})
  createdAt: Date;

  @Column({type: 'timestamptz'})
  updatedAt: Date;

  @Column({type: 'timestamptz'})
  deletedAt: Date;
}
