import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { DbModule } from '../../db/db.module';
import { AppointmentRepository } from './appointment.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [DbModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository, UserRepository],
})
export class AppointmentModule { }
