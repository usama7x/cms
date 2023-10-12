import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CheckupMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({nullable: true})
  morningIntake: number

  @Column({nullable: true})
  morningIntakeAfterMeal: boolean = true;

  @Column({nullable: true})
  afternoonIntake: number;
  
  @Column({nullable: true})
  afternoonIntakeAfterMeal: boolean = true;

  @Column({nullable: true})
  eveningIntake: number;

  @Column({nullable: true})
  eveningIntakeAfterMeal: boolean = true;

  @Column({nullable: true})
  nightIntake: number;

  @Column({nullable: true})
  nightIntakeAfterMeal: boolean = true;

  @Column()
  intakeDays: number;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: 'NOW()' })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
