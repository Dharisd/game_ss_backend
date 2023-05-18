import { Controller, Get, Post, Put, NotFoundException, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CreateRegistrationRequestDto } from './dto/create-registrationrequest.dto';
import { UpdateRegistrationRequestDto } from './dto/update-registrationrequest.dto';
import { RegistrationRequestService } from './registration-request.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ConflictException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Readable } from 'stream';










@Controller('registration-request')
export class RegistrationRequestController {
  constructor(private readonly registrationRequest: RegistrationRequestService) { }



  @Post('create')
  @UseInterceptors(FileInterceptor('paymentSlip'))
  @ApiConsumes('multipart/form-data')
  async create(@UploadedFile() paymentSlip: Express.Multer.File, @Body() CreateRegistrationRequestDto: CreateRegistrationRequestDto) {



    const imageFileName = paymentSlip.originalname;
    console.log(imageFileName)
    await fs.promises.writeFile(join(__dirname, '..', '..', 'uploads', imageFileName), paymentSlip.buffer);

    //process the date field
    // const date = new Date(CreateRegistrationRequestDto.dob);
    // console.log(date)
    // CreateRegistrationRequestDto.dob = date;

    //add the file name to dto
    CreateRegistrationRequestDto.payment_slip = imageFileName;
    CreateRegistrationRequestDto.phone_number = Number(CreateRegistrationRequestDto.phone_number);


    try {// Save the data to the Prisma database
      const registration = await this.registrationRequest.create(
        CreateRegistrationRequestDto
      )
      return registration;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        // If the error code is P2002 and the error is related to the email field, throw a ConflictException
        throw new ConflictException('Email already exists');
      } else {
        // Handle any other unexpected errors
        console.error(error);
        throw new InternalServerErrorException('An error occurred');
      }
    }



  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const registrationRequests = await this.registrationRequest.findAll();

    return registrationRequests;
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id/accept')
  async acceptRequest(@Param('id') id: number) {
    const registrationRequest = await this.registrationRequest.findById(Number(id));
    if (!registrationRequest) {
      throw new NotFoundException('Registration request not found');
    }

    // Perform any necessary processing for accepting the request

    registrationRequest.accepted = true;
    return this.registrationRequest.update(Number(id), registrationRequest);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id/reject')
  async rejectRequest(@Param('id') id: number, @Body() updateRequestDto: UpdateRegistrationRequestDto) {
    const registrationRequest = await this.registrationRequest.findById(Number(id));
    if (!registrationRequest) {
      throw new NotFoundException('Registration request not found');
    }

    // Perform any necessary processing for rejecting the request
    registrationRequest.accepted = false;
    registrationRequest.rejected_reason = updateRequestDto.rejected_reason;

    return this.registrationRequest.update(Number(id), registrationRequest);
  }




  @UseGuards(JwtAuthGuard)
  @Get('/export')
  async exportAcceptedRequests(@Res() res: Response) {
    try {
      const acceptedRequests = await this.registrationRequest.findAccepted();

      const csvData = this.convertToCSV(acceptedRequests);
      const filename = 'accepted_registration_requests.csv';

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      const stream = Readable.from(csvData);

      stream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  private convertToCSV(data: any[]): string {
    const header = ['Name', 'NID', 'DOB', 'Email', 'Faculty', 'Phone Number'];

    const rows = data.map((request) => [
      request.name,
      request.nid,
      request.dob,
      request.email,
      request.faculty,
      request.phone_number,
    ]);

    const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
    return csv;
  }


}

