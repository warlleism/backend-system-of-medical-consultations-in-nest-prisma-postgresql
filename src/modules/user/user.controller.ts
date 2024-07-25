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
import { MissingFieldsError } from 'src/helpers/api-erros';

@Controller('user')
export class UserController {
    constructor(private repo: UserRepository) { }

    @Post('create')
    async create(@Body() user: IUser) {

        if (!user || !user.email || !user.password) {
            throw new MissingFieldsError('all fields are required');
        }

        try {
            const hashPassword = await bcrypt.hash(user.password, 10)
            const formatedPassword = { ...user, password: hashPassword }
            const novoUsuario = await this.repo.create(formatedPassword);
            const { password, ...rest } = novoUsuario
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User created successfully',
                data: rest,
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
            const users = await this.repo.getAll();
            const sanitizedUsers = users.map(({ password, ...rest }) => rest);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Get All Users successfully',
                data: sanitizedUsers,
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
            const { password, ...rest } = updatedUser
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User updated successfully',
                data: rest,
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
            const { password, ...rest } = user
            return {
                statusCode: HttpStatus.CREATED,
                message: user == null ? 'User not found' : 'Get One User successfully',
                data: user == null ? [] : rest,
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
            const { password, ...rest } = user
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User deleted successfully',
                data: rest,
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