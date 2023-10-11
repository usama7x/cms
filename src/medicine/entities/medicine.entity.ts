import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  ageLimit: number;

  @Column({ type: 'simple-array', nullable: true })
  sideEffects: string[];

  @Column({ type: 'timestamp with time zone' })
  manufacturingDate: Date;

  @Column({ type: 'timestamp with time zone' })
  expiryDate: Date;

  @Column({ nullable: true })
  pricePerUnit: number;

  @Column({ nullable: true })
  uom: string;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;
}