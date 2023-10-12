import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineInput } from './dto/create-medicine.input';
import { UpdateMedicineInput } from './dto/update-medicine.input';

@Resolver(() => Medicine)
export class MedicineResolver {
  constructor(private readonly medicineService: MedicineService) {}

  @Mutation(() => Medicine)
  createMedicine(@Args('createMedicineInput') createMedicineInput: CreateMedicineInput) {
    return this.medicineService.create(createMedicineInput);
  }

  @Query(() => [Medicine], { name: 'medicine' })
  findAll() {
    return this.medicineService.findAll();
  }

  @Query(() => Medicine, { name: 'medicine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.findOne(id);
  }

  @Mutation(() => Medicine)
  updateMedicine(@Args('updateMedicineInput') updateMedicineInput: UpdateMedicineInput) {
    return this.medicineService.update(updateMedicineInput.id, updateMedicineInput);
  }

  @Mutation(() => Medicine)
  removeMedicine(@Args('id', { type: () => Int }) id: number) {
    return this.medicineService.remove(id);
  }
}
