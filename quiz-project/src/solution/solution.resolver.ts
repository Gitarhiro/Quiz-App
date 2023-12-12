import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SolutionService } from './solution.service';
import { Solution } from './entities/Solution';
import { Quiz } from 'src/quiz/entities/Quiz';
import { InputSolution } from './dto/Solution.dto';

@Resolver()
export class SolutionResolver {
    constructor(
        private solutionservice:SolutionService
    ){}

    @Mutation((returns)=> Solution)
    solveTheQuiz(@Args('inputSolution') inputSolution: InputSolution){
        return this.solutionservice.solveTheQuiz(inputSolution);
    }

}
