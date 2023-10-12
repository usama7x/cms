import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CheckupService } from './checkup.service';
import { Checkup } from './entities/checkup.entity';
import { CreateCheckupInput } from './dto/create-checkup.input';
import { UpdateCheckupInput } from './dto/update-checkup.input';

@Resolver(() => Checkup)
export class CheckupResolver {
  constructor(private readonly checkupService: CheckupService) {}

  @Mutation(() => Checkup)
  createCheckup(@Args('createCheckupInput') createCheckupInput: CreateCheckupInput) {
    return this.checkupService.create(createCheckupInput);
  }

  @Query(() => [Checkup], { name: 'checkup' })
  findAll() {
    return this.checkupService.findAll();
  }

  @Query(() => Checkup, { name: 'checkup' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.checkupService.findOne(id);
  }

  @Mutation(() => Checkup)
  updateCheckup(@Args('updateCheckupInput') updateCheckupInput: UpdateCheckupInput) {
    return this.checkupService.update(updateCheckupInput.id, updateCheckupInput);
  }

  @Mutation(() => Checkup)
  removeCheckup(@Args('id', { type: () => Int }) id: number) {
    return this.checkupService.remove(id);
  }
}
