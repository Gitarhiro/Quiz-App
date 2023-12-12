import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module'
import { Quiz } from './quiz/entities/Quiz';
import { Answer } from './answer/entities/Answer';
import { Question } from './question/entities/Question';
import { join } from 'path';
import { AnswerModule } from './answer/answer.module';
import { SolutionResolver } from './solution/solution.resolver';
import { SolutionService } from './solution/solution.service';
import { SolutionModule } from './solution/solution.module';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'haslo',
      database: 'Quiz',
      entities:[Quiz, Question, Answer],
      synchronize: true,
    }),
    QuizModule,
    QuestionModule,
    AnswerModule,
    SolutionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
