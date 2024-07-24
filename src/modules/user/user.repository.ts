import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import IUser from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) { }

  //CRUD

  async getAll() {
    return this.prismaService.user.findMany();
  }

  async getOneById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(user: IUser) {
    return this.prismaService.user.create({
      data: user as any,
    });
  }

  async update(user: IUser) {
    if (!user.id) throw new Error('Usuário sem ID');
    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user as any,
    });
  }

  async delete(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  //Authentication

  async login(user: IUser) {
    return this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
  }
}