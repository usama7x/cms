import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Checkup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'float8'})
  fee: number;

  @Column()
  intakeDays: number;

  @Column({nullable: true})
  description: string;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToMany(() => Medicine)
  @JoinTable({name:'checkup_medicine'})
  medicine: Medicine[];
}
