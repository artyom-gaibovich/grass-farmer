import { Test, TestingModule } from '@nestjs/testing';
import { GrassAccountController } from './grass-account.controller';

describe('GrassAccountController', () => {
  let controller: GrassAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrassAccountController],
    }).compile();

    controller = module.get<GrassAccountController>(GrassAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
