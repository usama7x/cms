import { CreateCheckupMedicineInput } from './create-checkup-medicine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCheckupMedicineInput extends PartialType(CreateCheckupMedicineInput) {
  @Field(() => Int)
  id: number;
}
