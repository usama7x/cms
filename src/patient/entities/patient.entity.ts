import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  dob: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  guardianName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'simple-array', nullable: true })
  healthProblems: string[];

  @Column({ type: 'simple-array', nullable: true })
  medication: string[];

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;
}

