import { Test, TestingModule } from '@nestjs/testing';
import { AccesstokenService } from './accesstoken.service';

describe('AccesstokenService', () => {
  let service: AccesstokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccesstokenService],
    }).compile();

    service = module.get<AccesstokenService>(AccesstokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
