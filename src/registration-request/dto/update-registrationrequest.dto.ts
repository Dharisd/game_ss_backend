import { PartialType } from '@nestjs/swagger';
import { CreateRegistrationRequestDto } from './create-registrationrequest.dto';

export class UpdateRegistrationRequestDto {
    accepted?: boolean;
    rejected_reason?: string;
  }