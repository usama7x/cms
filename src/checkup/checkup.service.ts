import { Injectable } from '@nestjs/common';
// import { CreateCheckupInput } from './dto/create-checkup.input';
// import { UpdateCheckupInput } from './dto/update-checkup.input';

@Injectable()
export class CheckupService {
  // create(createCheckupInput: CreateCheckupInput) {
  //   return 'This action adds a new checkup';
  // }

  findAll() {
    return `This action returns all checkup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkup`;
  }

  // update(id: number, updateCheckupInput: UpdateCheckupInput) {
  //   return `This action updates a #${id} checkup`;
  // }

  remove(id: number) {
    return `This action removes a #${id} checkup`;
  }
}
