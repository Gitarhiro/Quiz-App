import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from './entities/Quiz';
import { async } from 'rxjs';

describe('QuizService', () => {
  let service: QuizService;

  const mockQuizRepository ={
    createQuiz: jest.fn(dto=>{
      return {
        id: Date.now(),
        ...dto
      }
    }),
    deleteQuiz: jest.fn((id) => {
      return {
        deleted: true,
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService,
      {
        provide: getRepositoryToken(Quiz),
        useValue: mockQuizRepository,
      }
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new quiz', async()=>{
    expect(await service.createQuiz({name: "nowy quiz", topic: "math"})).toEqual({
      id: expect.any(Number),
      name: "nowy quiz",
      topic: "math"
    })
  });

  it('should delete a quiz', async()=> {
    expect(await service.deleteQuiz(1)).toEqual({deleted:true});
  });
  
});
