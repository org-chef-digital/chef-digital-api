import { Test, TestingModule } from '@nestjs/testing';
import { LunchboxesService } from './lunchboxes.service';

describe('LunchboxesService', () => {
  let service: LunchboxesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LunchboxesService],
    }).compile();

    service = module.get<LunchboxesService>(LunchboxesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
