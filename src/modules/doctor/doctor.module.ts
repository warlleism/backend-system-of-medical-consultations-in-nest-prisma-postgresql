import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DbModule } from '../../db/db.module';
import { DoctorRepository } from './doctor.repository';
import { AppointmentRepository } from '../appointment/appointment.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [DbModule],
  controllers: [DoctorController],
  providers: [DoctorRepository, AppointmentRepository, UserRepository]
})
export class DoctorModule { }
