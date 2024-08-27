import { Test, TestingModule } from '@nestjs/testing';
import { LunchboxesController } from './lunchboxes.controller';
import { LunchboxesService } from './lunchboxes.service';

describe('LunchboxesController', () => {
  let controller: LunchboxesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LunchboxesController],
      providers: [LunchboxesService],
    }).compile();

    controller = module.get<LunchboxesController>(LunchboxesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
