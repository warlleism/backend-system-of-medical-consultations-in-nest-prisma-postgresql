import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { UserRepository } from '../modules/user/user.repository';
import { DbModule } from '../db/db.module';

@Module({
    imports: [DbModule],
    providers: [UserRepository],
})
export class LoggerMiddlewareModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                { path: 'appointment/create', method: RequestMethod.POST },
                { path: 'appointment/getAll', method: RequestMethod.GET },
                { path: 'appointment/getOneById/:id', method: RequestMethod.GET },
                { path: 'appointment/delete/:id', method: RequestMethod.DELETE },
                { path: 'appointment/update', method: RequestMethod.PATCH },
                { path: 'doctor/create', method: RequestMethod.POST },
                { path: 'doctor/getAll', method: RequestMethod.GET },
                { path: 'doctor/getOneById/:id', method: RequestMethod.GET },
                { path: 'doctor/delete/:id', method: RequestMethod.DELETE },
                { path: 'doctor/update', method: RequestMethod.PATCH },
                { path: 'doctor/getAllSpeciality', method: RequestMethod.GET },
                { path: 'doctor/getSearch/:search', method: RequestMethod.GET },
                { path: 'patient/create', method: RequestMethod.POST },
                { path: 'patient/getAll', method: RequestMethod.GET },
                { path: 'patient/getOneById/:id', method: RequestMethod.GET },
                { path: 'patient/delete/:id', method: RequestMethod.DELETE },
                { path: 'patient/update', method: RequestMethod.PATCH },
                { path: 'result/create', method: RequestMethod.POST },
                { path: 'result/delete/:id', method: RequestMethod.DELETE },
                { path: 'result/update', method: RequestMethod.PATCH },
                { path: 'user/getAll', method: RequestMethod.GET },
                { path: 'user/getOneById/:id', method: RequestMethod.GET },
                { path: 'user/delete/:id', method: RequestMethod.DELETE },
                { path: 'user/update', method: RequestMethod.PATCH },
            );
    }
}
