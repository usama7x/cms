import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  ageLimit: number;

  @Column({ type: 'simple-array' })
  sideEffects: string[];

  @Column({ type: 'timestamptz' })
  manufacturingDate: Date;

  @Column({ type: 'timestamptz' })
  expiryDate: Date;

  @Column()
  pricePerUnit: number;

  @Column()
  uom: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  deletedAt: Date;
}
