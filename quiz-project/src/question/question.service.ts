import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/Question';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create_question.dto';
import { Quiz } from 'src/quiz/entities/Quiz';
import { error } from 'console';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>
    ){}

    async solveQuiz(id:number):Promise<Question[]> {
        var allQ = this.questionRepository.createQueryBuilder("question")
        .where("question.quiz_id = :id", {id: id})
        .leftJoinAndSelect("question.answers" , "answer")
        .getMany();
        (await allQ).forEach(function(x){
            if(x.type==='open'){x.answers[0].contents = null}
        });
        return allQ;
    }

    async getQuestions(id: number):Promise<Question[]> {
        const allQ = this.questionRepository.createQueryBuilder("question")
        .where("question.quiz_id = :id", {id: id})
        .leftJoinAndSelect("question.answers" , "answer")
        .getMany();
        
        //await this.questionRepository.find({where:{quiz:{id: id}}, relations: ['quiz']});
              
        return allQ
        }

    async deleteQuestion(id: number): Promise<boolean> {
        const result = await this.questionRepository.delete(id);
        return result.affected !== 0;
    }

    async createQuestion(createquestion: CreateQuestionDto):Promise<Question> {
        const findQuiz = await this.quizRepository.findOneBy({id: createquestion.quiz_id});
        if(!findQuiz) {
            throw new error ('No such quiz in DB');
        } 
        const newQuestion = this.questionRepository.create({
            type: createquestion.type,
            content: createquestion.content,
            quiz: findQuiz
        });
        return this.questionRepository.save(newQuestion);
    }
}
