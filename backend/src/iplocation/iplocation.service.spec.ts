import { Test, TestingModule } from '@nestjs/testing';
import { IplocationService } from './iplocation.service';

describe('IplocationService', () => {
  let service: IplocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IplocationService],
    }).compile();

    service = module.get<IplocationService>(IplocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
