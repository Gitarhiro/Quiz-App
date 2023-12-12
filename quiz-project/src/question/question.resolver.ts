import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/Question';
import { CreateQuestionDto } from './dto/create_question.dto';

@Resolver()
export class QuestionResolver {
    constructor(
        private questionservice: QuestionService
    ) {}

    @Query((returns) => [Question], {nullable: true})
    getQuizQuestion(@Args('id', {type: ()=>Int}) id: number) {
        return this.questionservice.getQuestions(id);
    }

    @Query((returns) => [Question], {nullable: true})
    solveQuiz(@Args('id', {type: ()=>Int} )id: number){
        return this.questionservice.solveQuiz(id);
    }

    @Mutation(() => Question)
    createQuestion(@Args('createquestion') createquestion: CreateQuestionDto) {
        return this.questionservice.createQuestion(createquestion);
    }

    @Mutation(()=>Boolean)
    deleteQuestion(@Args('id', {type: ()=>Int}) id: number) {
        return this.questionservice.deleteQuestion(id);
    }
}
