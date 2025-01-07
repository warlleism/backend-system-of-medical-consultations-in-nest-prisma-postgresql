import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { DbModule } from './db/db.module';
import { ResultModule } from './modules/result/result.module';
import { LoggerMiddlewareModule } from './middlewares/logger.middleware.module';
@Module({
  imports: [
    UserModule,
    AppointmentModule,
    DoctorModule,
    PatientModule,
    ResultModule,
    DbModule,
    LoggerMiddlewareModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
