import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/Quiz';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResolver } from './quiz.resolver';
import { QuestionResolver } from 'src/question/question.resolver';
import { QuestionService } from 'src/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  providers: [QuizService, QuizResolver]
})
export class QuizModule {}
