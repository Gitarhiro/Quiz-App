import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/Quiz';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResolver } from './quiz.resolver';
import { Question } from 'src/question/entities/Question';
import { Answer } from 'src/answer/entities/Answer';
import { QuestionModule } from 'src/question/question.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Answer]), QuestionModule, AnswerModule],
  providers: [QuizService, QuizResolver],
})
export class QuizModule {}
