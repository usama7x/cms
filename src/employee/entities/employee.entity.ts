import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  cnic: string;

  @Column({ type: 'timestamp with time zone' })
  dob: Date;

  @Column({ type: 'float8' })
  salary: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  contactNumber: number;

  @Column({ nullable: true })
  guardianNumber: number;

  @Column({ nullable: true })
  isFulltime: boolean = true;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
