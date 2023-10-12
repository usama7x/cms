import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CheckupMedicineService } from './checkup-medicine.service';
import { CheckupMedicine } from './entities/checkup-medicine.entity';
import { CreateCheckupMedicineInput } from './dto/create-checkup-medicine.input';
import { UpdateCheckupMedicineInput } from './dto/update-checkup-medicine.input';

@Resolver(() => CheckupMedicine)
export class CheckupMedicineResolver {
  constructor(private readonly checkupMedicineService: CheckupMedicineService) {}

  @Mutation(() => CheckupMedicine)
  createCheckupMedicine(@Args('createCheckupMedicineInput') createCheckupMedicineInput: CreateCheckupMedicineInput) {
    return this.checkupMedicineService.create(createCheckupMedicineInput);
  }

  @Query(() => [CheckupMedicine], { name: 'checkupMedicine' })
  findAll() {
    return this.checkupMedicineService.findAll();
  }

  @Query(() => CheckupMedicine, { name: 'checkupMedicine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.checkupMedicineService.findOne(id);
  }

  @Mutation(() => CheckupMedicine)
  updateCheckupMedicine(@Args('updateCheckupMedicineInput') updateCheckupMedicineInput: UpdateCheckupMedicineInput) {
    return this.checkupMedicineService.update(updateCheckupMedicineInput.id, updateCheckupMedicineInput);
  }

  @Mutation(() => CheckupMedicine)
  removeCheckupMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.checkupMedicineService.remove(id);
  }
}
