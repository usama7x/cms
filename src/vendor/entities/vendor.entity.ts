import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
