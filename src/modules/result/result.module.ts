import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultRepository } from './result.repository';
import { DbModule } from '../../db/db.module';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [DbModule],
  controllers: [ResultController],
  providers: [ResultRepository, UserRepository],
})
export class ResultModule { }
