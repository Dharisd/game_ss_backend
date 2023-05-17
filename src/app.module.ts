import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationRequestService } from './registration-request/registration-request.service';
import { RegistrationRequestController } from './registration-request/registration-request.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule],
  controllers: [AppController, RegistrationRequestController],
  providers: [AppService, RegistrationRequestService, UsersModule],
})
export class AppModule {}
