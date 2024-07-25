import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { DbModule } from 'src/db/db.module';
import { AppointmentRepository } from './appointment.repository';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [DbModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository],
})
export class AppointmentModule {
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
