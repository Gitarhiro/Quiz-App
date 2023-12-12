import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Answer } from './entities/Answer';
import { CreateAnswerDto } from './dto/create_answer.dto';
import { AnswerService } from './answer.service';

@Resolver()
export class AnswerResolver {
    
    constructor(
        private answerservice: AnswerService,
    ){}

    @Mutation(()=>Boolean)
    deleteAnswer(@Args('id') id: number){
        return this.answerservice.deleteAnswer(id);
    }

    @Mutation(() => Answer)
    createAnwser(@Args('createanwser') createanswer: CreateAnswerDto) {
        return this.answerservice.createAnwser(createanswer);
    }
}
