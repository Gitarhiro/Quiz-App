import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  let service: AnswerService;

  const mockAnswerRepository ={
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
      providers: [AnswerService],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new quiz', async()=>{
    expect(await service.createAnwser({contents: "Warszawa", isCorrect: true, sortOrder: null, ques_id:1})).toEqual({
      id: expect.any(Number),
      content:'Stolica Polski',
      quiz_id:1
    })
  });

  it('should delete a quiz', async()=> {
    expect(await service.deleteAnswer(1)).toEqual({deleted:true});
  });
});
