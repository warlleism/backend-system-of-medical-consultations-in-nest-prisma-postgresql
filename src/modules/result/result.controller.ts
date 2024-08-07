import { Body, Controller, Delete, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ResultRepository } from './result.repository';
import IResult from './Result.entity';
import handleError from 'src/helpers/api-errors';

@Controller('result')
export class ResultController {
    constructor(private repo: ResultRepository) { }

    @Post('create')
    async create(@Body() result: IResult) {

        try {

            if (Object.values(result).some(value =>
                (typeof value === 'string' && value.trim().length === 0) || value === null || value === undefined
            )) {
                throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'fields are required',
                }, HttpStatus.BAD_REQUEST);
            }

            const resultData = await this.repo.create(result);

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Create result successfully',
                data: resultData,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Create result failed',
                error: handleError('result', error),
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('update')
    async update(@Body() result: IResult) {
        try {

            if (Object.values(result).some(value =>
                (typeof value === 'string' && value.trim().length === 0) || value === null || value === undefined
            )) {
                throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'fields are required',
                }, HttpStatus.BAD_REQUEST);
            }

            const resultData = await this.repo.update(result);

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Update result successfully',
                data: resultData,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'update result failed',
                error: handleError('result', error),
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        try {
            const result = await this.repo.delete(+id);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Delete result successfully',
                data: result,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Delete result failed',
                error: handleError('result', error),
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
