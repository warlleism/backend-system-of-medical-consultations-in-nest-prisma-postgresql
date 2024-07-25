import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DbModule } from 'src/db/db.module';
import { DoctorRepository } from './doctor.repository';
import { AppointmentRepository } from '../appointment/appointment.repository';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [DbModule],
  controllers: [DoctorController],
  providers: [DoctorRepository, AppointmentRepository]
})
export class DoctorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'user/create', method: RequestMethod.POST },
        { path: 'user/getAll', method: RequestMethod.GET },
        { path: 'user/getOneById/:id', method: RequestMethod.GET },
        { path: 'user/delete/:id', method: RequestMethod.DELETE },
        { path: 'user/update/:id', method: RequestMethod.PATCH },
      );
  }
}
