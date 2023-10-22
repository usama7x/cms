import { Injectable } from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { BaseService } from 'src/base/base-service';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService extends BaseService<
  Patient,
  CreatePatientInput,
  UpdatePatientInput,
  Patient
> {}
