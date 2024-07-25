import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { DbModule } from 'src/db/db.module';
import { PatientRepository } from './patient.repository';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [DbModule],
  controllers: [PatientController],
  providers: [PatientRepository],
})
export class PatientModule {
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
