import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';




export class CreateRegistrationRequestDto {
    @ApiProperty({ type: 'string' })
    name: string;
    @ApiProperty({ type: 'string' })
    nid: string;
    
    @ApiProperty({   type: Number,
    default: new Date()  })
    dob: Date;
    @ApiProperty({ type: 'string' })
    email: string;
    @ApiProperty({ type: 'string' })
    faculty: string;
    @ApiProperty({ type: 'integer' })
    phone_number: number;

    @IsOptional()
    payment_slip: string;
    
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @IsOptional()
    paymentSlip: Express.Multer.File
}
