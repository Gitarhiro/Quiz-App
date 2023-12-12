import { Test, TestingModule } from '@nestjs/testing';
import { SolutionService } from './solution.service';
import { async } from 'rxjs';

describe('SolutionService', () => {
  let service: SolutionService;

  const mockAnswerRepository ={
    SolveTheQuiz: jest.fn(dto=>dto),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionService],
    }).compile();

    service = module.get<SolutionService>(SolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a result from the test',async()=>{
    expect(await service.solveTheQuiz({
      quiz_id:1,
      answers:[{
        id: 1,
        contents: 'Warszawa',
        sortOrder: null,
      }] 
    })).toEqual({score:1})
  })
});
