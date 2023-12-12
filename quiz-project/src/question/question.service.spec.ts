import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  const mockQuestionRepository ={
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
      providers: [QuestionService],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new quiz', async()=>{
    expect(await service.createQuestion({type:'single', content:'Stolica Polski', quiz_id:1})).toEqual({
      id: expect.any(Number),
      content:'Stolica Polski',
      quiz_id:1
    })
  });

  it('should delete a quiz', async()=> {
    expect(await service.deleteQuestion(1)).toEqual({deleted:true});
  });
  
});
