import { Test, TestingModule } from '@nestjs/testing';
import { IplocationController } from './iplocation.controller';

describe('IplocationController', () => {
  let controller: IplocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IplocationController],
    }).compile();

    controller = module.get<IplocationController>(IplocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
