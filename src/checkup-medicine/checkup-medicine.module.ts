import { Module } from '@nestjs/common';
import { CheckupMedicineService } from './checkup-medicine.service';
import { CheckupMedicineResolver } from './checkup-medicine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckupMedicine } from './entities/checkup-medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckupMedicine])],
  providers: [CheckupMedicineResolver, CheckupMedicineService],
})
export class CheckupMedicineModule {}
