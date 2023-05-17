import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistrationRequestDto } from './dto/create-registrationrequest.dto';
import { UpdateRegistrationRequestDto } from './dto/update-registrationrequest.dto';


import { RegistrationRequest, Prisma } from '@prisma/client';


@Injectable()
export class RegistrationRequestService {
  constructor(private readonly prisma: PrismaService) {}


  async create(CreateRegistrationRequestDto: CreateRegistrationRequestDto) {

    return this.prisma.registrationRequest.create({
      data: {
        ...CreateRegistrationRequestDto,
      },
    });
  }

  
  async findAll() {
    return this.prisma.registrationRequest.findMany();
  }

  async findById(id: number) {
    return this.prisma.registrationRequest.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRegistrationRequestDto: UpdateRegistrationRequestDto) {
    return this.prisma.registrationRequest.update({
      where: {
        id,
      },
      data: {
        ...updateRegistrationRequestDto,
      },
    });
  }


}
