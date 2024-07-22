import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { DbModule } from 'src/db/db.module';
import { PatientRepository } from './patient.repository';

@Module({
  imports: [DbModule],
  controllers: [PatientController],
  providers: [PatientRepository],
})
export class PatientModule { }
