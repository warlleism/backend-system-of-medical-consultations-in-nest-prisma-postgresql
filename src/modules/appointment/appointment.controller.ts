import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import IAppointment from './appointment.entity';
import FormatData from 'src/utils/formatData';

@Controller('appointment')
export class AppointmentController {
    constructor(private repo: AppointmentRepository) { }

    @Post('create')
    async create(@Body() appointment: IAppointment) {
        try {
            const formattedAppointment = { ...appointment, appointmentdate: FormatData(appointment.appointmentdate) };
            const result = await this.repo.create(formattedAppointment);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Create appointment successfully',
                data: result,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Create appointment failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('update')
    async update(@Body() appointment: IAppointment) {
        try {
            const formattedAppointment = { ...appointment, appointmentdate: FormatData(appointment.appointmentdate) };
            const result = await this.repo.update(formattedAppointment);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Create appointment successfully',
                data: result,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Create appointment failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getAll')
    async getAll() {
        try {
            const doctors = await this.repo.getAll();
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Get All doctors successfully',
                data: doctors,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Get All doctors failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getOneById/:id')
    async getOne(@Param('id') id: number) {
        try {
            const appointment = await this.repo.getOne(+id);

            if (!appointment || Object.keys(appointment).length === 0) {
                throw new Error('Appointment not found');
            }

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Get All appointment successfully',
                data: appointment,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Get All doctors failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }



    @Delete('delete/:id')
    async delete(@Param('id') id: number) {
        try {
            const result = await this.repo.delete(+id);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Delete appointment successfully',
                data: result,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Delete appointment failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

}
