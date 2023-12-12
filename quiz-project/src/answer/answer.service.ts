import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/Answer';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { Question } from 'src/question/entities/Question';
import { error } from 'console';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer) private answerrepository: Repository<Answer>,
        @InjectRepository(Question) private questionRepository: Repository<Question>
        ) {}


    async deleteAnswer(id:number):Promise<boolean> {
        const result = await this.answerrepository.delete(id);
        return result.affected !== 0;
    }


    async createAnwser(createanswer: CreateAnswerDto):Promise<Answer> {
        const findQues = await this.questionRepository.findOneBy({id: createanswer.ques_id});
        if(!findQues) {
            throw new error ('no such question in DB');
        }
        if(findQues.type === 'open' && createanswer.isCorrect === false) {
            throw new error('open answers can have only one correct answer!');
        }
        if(findQues.type === 'single' || findQues.type === 'open') {
            const findCorrect = await this.answerrepository.find({
                where: {question: findQues, isCorrect: true}});
            if(findCorrect.length && createanswer.isCorrect === true) {
                throw new error('single/open anwser question already has correct anwser!');
            }
        }
        if(findQues.type === 'sorting' && (createanswer.sortOrder === null || createanswer.isCorrect === false)) {
            throw new error('order question has to have a value for sortOrder!');
        }
        const newAnswer = this.answerrepository.create({
            contents: createanswer.contents,
            isCorrect: createanswer.isCorrect,
            sortOrder: createanswer.sortOrder,
            question: findQues
        })
        return this.answerrepository.save(newAnswer);
    }
}
