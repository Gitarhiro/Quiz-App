import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/Question';
import { Quiz } from 'src/quiz/entities/Quiz';
import { Repository } from 'typeorm';
import { Solution } from './entities/Solution';
import { InputSolution } from './dto/Solution.dto';
import { Answer } from 'src/answer/entities/Answer';
import { compareTwoStrings } from 'string-similarity';

@Injectable()
export class SolutionService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>
    ){}

    async solveTheQuiz(inputSolution: InputSolution):Promise<Solution>{
        var sol = new Solution()
        sol.score = 0;
        for(const i in inputSolution.answers) {
            const allQ = this.answerRepository.findOne({where:{id:inputSolution.answers[i].id}});
            if (compareTwoStrings(inputSolution.answers[i].contents, (await allQ).contents) > 0.5
            && (await allQ).sortOrder === inputSolution.answers[i].sortOrder 
            && (await allQ).isCorrect === true){
                sol.score = sol.score +1;
        }
        }
        return sol;
    }
    
}
