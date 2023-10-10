// import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Medicine)
  @JoinColumn()
  medicine: Medicine

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;

}
