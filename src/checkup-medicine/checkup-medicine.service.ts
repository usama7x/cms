import { Injectable } from '@nestjs/common';
// import { CreateCheckupMedicineInput } from './dto/create-checkup-medicine.input';
// import { UpdateCheckupMedicineInput } from './dto/update-checkup-medicine.input';

@Injectable()
export class CheckupMedicineService {
  // create(createCheckupMedicineInput: CreateCheckupMedicineInput) {
  //   return 'This action adds a new checkupMedicine';
  // }

  findAll() {
    return `This action returns all checkupMedicine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkupMedicine`;
  }

  // update(id: number, updateCheckupMedicineInput: UpdateCheckupMedicineInput) {
  //   return `This action updates a #${id} checkupMedicine`;
  // }

  remove(id: number) {
    return `This action removes a #${id} checkupMedicine`;
  }
}
