import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { BaseResolver } from 'src/base/base-resolver';

@Resolver(() => Patient)
export class PatientsResolver extends BaseResolver({
  returnTypeClassRef: Patient,
  createTypeClassRef: CreatePatientInput,
  updateTypeClassRef: UpdatePatientInput,
}) {
  constructor(private readonly patientsService: PatientsService) {
    super();
  }
}
