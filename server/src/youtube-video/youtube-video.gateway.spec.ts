import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeVideoGateway } from './youtube-video.gateway';

describe('YoutubeVideoGateway', () => {
  let gateway: YoutubeVideoGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeVideoGateway],
    }).compile();

    gateway = module.get<YoutubeVideoGateway>(YoutubeVideoGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
