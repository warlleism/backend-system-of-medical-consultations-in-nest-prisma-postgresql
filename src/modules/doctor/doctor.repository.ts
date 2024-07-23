import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import IDoctor from "./doctor.entity";

@Injectable()
export class DoctorRepository {
    constructor(private prismaService: PrismaService) { }

    async getAll() {
        return this.prismaService.doctor.findMany();
    }

    async getOneById(id: number) {
        return this.prismaService.doctor.findUnique({
            where: {
                id
            }
        })
    }

    async create(doctor: IDoctor) {
        return this.prismaService.doctor.create({
            data: doctor
        })
    }

    async update(doctor: IDoctor) {
        return this.prismaService.doctor.update({
            where: {
                id: doctor.id
            },
            data: doctor
        })
    }

    async delete(id: number) {
        return this.prismaService.doctor.delete({
            where: {
                id
            }
        })
    }

}