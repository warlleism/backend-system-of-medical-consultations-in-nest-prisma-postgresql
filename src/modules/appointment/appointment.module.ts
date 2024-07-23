import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { DbModule } from 'src/db/db.module';
import { AppointmentRepository } from './appointment.repository';

@Module({
  imports: [DbModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository],
})
export class AppointmentModule { }
