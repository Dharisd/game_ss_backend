import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationRequestService } from './registration-request.service';

describe('RegistrationRequestService', () => {
  let service: RegistrationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationRequestService],
    }).compile();

    service = module.get<RegistrationRequestService>(RegistrationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
