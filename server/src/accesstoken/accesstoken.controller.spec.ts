import { Test, TestingModule } from '@nestjs/testing';
import { AccesstokenController } from './accesstoken.controller';

describe('AccesstokenController', () => {
  let controller: AccesstokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccesstokenController],
    }).compile();

    controller = module.get<AccesstokenController>(AccesstokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
