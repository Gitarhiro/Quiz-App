import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Quiz } from './entities/Quiz';
import { CreateQuizDto } from './dto/create_quiz.dto';
import { QuizService } from './quiz.service';


@Resolver()
export class QuizResolver {
    constructor(
        private quizservice:QuizService
    ) {}

    @Query((returns) => [Quiz])
    getQuizes() {
        return this.quizservice.getQuizes();
    }

    @Mutation((returns) => Quiz)
    createQuiz(@Args('createquiz') createquiz: CreateQuizDto) {
        return this.quizservice.createQuiz(createquiz);
    }

    @Mutation(()=> Boolean)
    deleteQuiz(@Args('id', {type: ()=>Int}) id: number) {
        return this.quizservice.deleteQuiz(id);
    }
}
