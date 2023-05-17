import { Module } from '@nestjs/common';
import { RegistrationRequestService } from './registration-request.service';
import { PrismaModule } from 'src/prisma/prisma.module';




@Module({
  providers: [RegistrationRequestService],
  exports: [RegistrationRequestService],
  imports: [PrismaModule],

})
export class RegistrationRequestModule {}