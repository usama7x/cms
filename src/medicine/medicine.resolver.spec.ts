import { Test, TestingModule } from '@nestjs/testing';
import { MedicineResolver } from './medicine.resolver';
import { MedicineService } from './medicine.service';

describe('MedicineResolver', () => {
  let resolver: MedicineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineResolver, MedicineService],
    }).compile();

    resolver = module.get<MedicineResolver>(MedicineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
