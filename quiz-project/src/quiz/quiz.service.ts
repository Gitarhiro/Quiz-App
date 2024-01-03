import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/Quiz';
import { CreateQuizDto } from './dto/create_quiz.dto';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';


@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
        private questionService: QuestionService,
        private answerService: AnswerService
        )
    {}

    async getQuizes(): Promise<Quiz[]> {
        const quizes = await this.quizRepository.createQueryBuilder("quiz")
    .leftJoinAndSelect("quiz.questions", "question")
    .getMany()
        return quizes;
    }

    async deleteQuiz(id: number): Promise<boolean> {
        const result = await this.quizRepository.delete(id);
        return result.affected !== 0;
    }

    async createQuiz(createquiz: CreateQuizDto): Promise<Quiz>  {
        const newQuiz = this.quizRepository.create({
            name: createquiz.name,
            topic: createquiz.topic,
        });
        
        for(const i in createquiz.questions) {
            this.questionService.createQuestion(createquiz.questions[i]);
            for(const j in createquiz.questions[i].answers) {
                this.answerService.createAnwser(createquiz.questions[i].answers[j])
            }
        }
        return await this.quizRepository.save(newQuiz);
    }
}
