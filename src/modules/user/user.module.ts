import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DbModule } from '../../db/db.module';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';

@Module({
  imports: [DbModule],
  controllers: [UserController, AuthController],
  providers: [UserRepository],
})
export class UserModule { }
