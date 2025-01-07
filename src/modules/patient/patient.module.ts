import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { DbModule } from '../../db/db.module';
import { PatientRepository } from './patient.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [DbModule],
  controllers: [PatientController],
  providers: [PatientRepository, UserRepository],
})
export class PatientModule { }
