import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationRequestController } from './registration-request.controller';

describe('RegistrationRequestController', () => {
  let controller: RegistrationRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationRequestController],
    }).compile();

    controller = module.get<RegistrationRequestController>(RegistrationRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
