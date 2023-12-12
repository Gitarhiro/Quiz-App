import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/Answer';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { Question } from 'src/question/entities/Question';

@Module({
  imports: [TypeOrmModule.forFeature([Answer,Question])],
  providers: [AnswerResolver, AnswerService]
})
export class AnswerModule {}
