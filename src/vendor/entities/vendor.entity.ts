import { StockHistory } from 'src/stock-history/entities/stock-history.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  deletedAt: Date;

  @OneToMany(() => StockHistory, stockHistory => stockHistory.vendor)
  stockHistory: StockHistory[];
}
