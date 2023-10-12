import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCheckupMedicineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
