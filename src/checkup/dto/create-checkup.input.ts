import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCheckupInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
