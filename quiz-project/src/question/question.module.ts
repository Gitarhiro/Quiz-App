import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./entities/Question";
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { Quiz } from "src/quiz/entities/Quiz";

@Module({
    imports: [TypeOrmModule.forFeature([Question, Quiz])],
    providers: [QuestionResolver,QuestionService]
})
export class QuestionModule{}