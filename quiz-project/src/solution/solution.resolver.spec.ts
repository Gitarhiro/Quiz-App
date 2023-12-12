import { Test, TestingModule } from '@nestjs/testing';
import { SolutionResolver } from './solution.resolver';

describe('SolutionResolver', () => {
  let resolver: SolutionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionResolver],
    }).compile();

    resolver = module.get<SolutionResolver>(SolutionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
