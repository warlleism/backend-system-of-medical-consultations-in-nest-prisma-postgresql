import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import IUser from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private repo: UserRepository) { }

    @Post('create')
    async create(@Body() user: IUser) {
        try {
            const hashPassword = await bcrypt.hash(user.password, 10)
            const formatedPassword = { ...user, password: hashPassword }
            const novoUsuario = await this.repo.create(formatedPassword);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User created successfully',
                data: novoUsuario,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'User creation failed',
                error: error.message.includes('Unique constraint failed on the fields: (`email`)') ? 'User already exists' : error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getAll')
    async getAll() {
        try {
            const usuarios = await this.repo.getAll();
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Get All Users successfully',
                data: usuarios,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Get All Users failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('update/:id')
    async update(@Body() user: IUser) {
        try {
            const updatedUser = await this.repo.update({ ...user });
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User updated successfully',
                data: updatedUser,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'User update failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getOne/:id')
    async getOneById(@Param('id') id: string) {
        try {
            const user = await this.repo.getOneById(+id);
            return {
                statusCode: HttpStatus.CREATED,
                message: user == null ? 'User not found' : 'Get One User successfully',
                data: user == null ? [] : user,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Get One User failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        try {
            const user = await this.repo.delete(+id)
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User deleted successfully',
                data: user,
            };

        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'User creation failed',
                error: error.message.includes('Record to delete does not exist') ? 'User not found' : error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}