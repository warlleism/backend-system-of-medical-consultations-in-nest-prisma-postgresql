import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DbModule } from 'src/db/db.module';
import { DoctorRepository } from './doctor.repository';

@Module({
  imports: [DbModule],
  controllers: [DoctorController],
  providers: [DoctorRepository]
})
export class DoctorModule { }
