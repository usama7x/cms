import { CreateCheckupInput } from './create-checkup.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCheckupInput extends PartialType(CreateCheckupInput) {
  @Field(() => Int)
  id: number;
}
