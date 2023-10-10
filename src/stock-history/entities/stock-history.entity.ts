// import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicine, medicine => medicine.stockHistory)
  medicine: Medicine;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'timestamp with time zone' })
  purchaseDate: Date;

  @ManyToOne(() => Vendor, vendor => vendor.stockHistory)
  vendor: Vendor;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
