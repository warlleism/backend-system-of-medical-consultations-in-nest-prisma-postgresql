import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import IAppointment from "./appointment.entity";

@Injectable()
export class AppointmentRepository {
    constructor(private prismaService: PrismaService) { }

    async create(appointment: IAppointment) {
        const result = await this.prismaService.appointment.create({
            data: appointment
        });
        return result;
    }

    async getAll() {
        const result = await this.prismaService.$queryRaw<IAppointment[]>`
   SELECT 
    a.id as id, 
    d.name AS "doutor(a)", 
    d.speciality as "especialidade", 
    a.appointmentdate AS "dia da consulta", 
    p.name AS "paciente", 
    p.gender as "gênero",
    a.description AS "descrição da consulta"
    FROM "Appointment" a 
    INNER JOIN "Doctor" d ON a.doctorid = d.id 
    INNER JOIN "Patient" p ON a.patientid = p.id;
    `;
        return result;
    }

    async getOne(id: number) {
        const result = await this.prismaService.$queryRaw<IAppointment[]>`
    SELECT 
    a.id AS id, 
    d.name AS "Doctor", 
    d.speciality AS "Specialty", 
    a.appointmentdate AS "Appointment_Date", 
    p.name AS "Patient", 
    p.gender AS "Gender",
    a.description AS "Appointment_Description"
        FROM "Appointment" a 
        INNER JOIN "Doctor" d ON a.doctorid = d.id 
        INNER JOIN "Patient" p ON a.patientid = p.id where p.id = ${id};
    `;
        return result;
    }

    async update(appointment: IAppointment) {
        const { id } = appointment;
        const result = await this.prismaService.appointment.update({
            where: {
                id
            },
            data: appointment
        });
        return result;
    }

    async delete(id: number) {
        const result = await this.prismaService.appointment.delete({
            where: {
                id
            }
        });
        return result;
    }

    async deleteDoctorAppointments(id: number) {
        const result = await this.prismaService.appointment.deleteMany({
            where: {
                doctorid: id
            }
        });
        return result;
    }

}
