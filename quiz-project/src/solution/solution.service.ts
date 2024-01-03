import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/Question';
import { Quiz } from 'src/quiz/entities/Quiz';
import { Repository } from 'typeorm';
import { Solution } from './entities/Solution';
import { InputSolution } from './dto/Solution.dto';
import { Answer } from 'src/answer/entities/Answer';
import { compareTwoStrings } from 'string-similarity';

interface answerflag  {
            anwserId: number;
        };
interface quesflag {
            quesId: number;
            score: number;
}

let answerflags: answerflag[] = [];
let quesflags: quesflag[] = [];



@Injectable()
export class SolutionService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>,
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        
    ){}

    findIfAnsNotFlagged(ansId: number) {
        //RETURNS TRUE IF THE ANSWER WAS NOT ALREADY USED
        //FALSE IF IT WAS 
        if(answerflags.findIndex(element => element.anwserId === ansId) < 0 ){
            let nowy: answerflag;
            nowy.anwserId = ansId;
            answerflags.push(nowy);
            return true;
        }
        return false;
    }

    findIfQuesFlagged(quesId:number){ 
        //IF IT WAS AN ANSWER FOR A QUESTION NOT YET ANSWERED, IT RETURNS THE NEW LAST INDEX OF THE ARRAY,
        //WHICH IS THE INDEX OF NEW FLAGGED QUESTION, 
        //IF IT WAS ANSWERED IT WILL RETURN THE INDEX OF THE QUESTION IN THE ARRAY 
        let it = quesflags.findIndex(element => element.quesId === quesId);
        if(it < 0 ) {
            let nowy: quesflag;
            nowy.quesId = quesId;
            nowy.score = 0;
            return (quesflags.push(nowy) - 1);
        }
        return it;
    }




    async solveTheQuiz(inputSolution: InputSolution):Promise<Solution>{
        let sol = new Solution()
        sol.score = 0;
        
        for(const i in inputSolution.answers) {
            const ques = this.questionRepository.findOne({where:{id:inputSolution.answers[i].questionId}});
            const ans = this.answerRepository.findOne({where:{contents:inputSolution.answers[i].contents}});
            if((await ques).quiz.id === inputSolution.quiz_id) {
                if(!this.findIfAnsNotFlagged((await ans).id)) {
                    switch ((await ques).type) {
                    case "single":
                        if(quesflags.length > this.findIfQuesFlagged((await ques).id)){
                            break;
                        }
                        if((await ans).isCorrect !== true) {
                            if(quesflags[quesflags.length - 1].score > 0 ) {
                                quesflags[quesflags.length - 1].score--;
                            }
                            break;
                        }
                        quesflags[quesflags.length - 1].score++;
                        break;
                    case "multiple":
                        const help = this.findIfQuesFlagged((await ques).id);
                        if((await ans).isCorrect !== true) {
                            if(quesflags[help].score > 0 ) {
                                quesflags[help].score--;
                            }
                            break;
                        }
                        quesflags[help].score++;
                        break;
                    case "sorting":
                        const helpsort = this.findIfQuesFlagged((await ques).id);
                        if((await ans).sortOrder !== inputSolution.answers[i].sortOrder) {
                            if(quesflags[quesflags.length - 1].score > 0 ) {
                                quesflags[quesflags.length - 1].score--;
                            }
                            break;
                        }
                        quesflags[helpsort].score++;
                        break;
                    case "open":
                        if(quesflags.length > this.findIfQuesFlagged((await ques).id)){
                            break;
                        }
                        if(compareTwoStrings(inputSolution.answers[i].contents, (await ans).contents) < 0.5) {
                            if(quesflags[quesflags.length - 1].score > 0 ) {
                                quesflags[quesflags.length - 1].score--;
                            }
                            break;
                        }
                        quesflags[quesflags.length - 1].score++;
                        break;
                }
                }
                
            }
        }
        for(const i in quesflags) {
            sol.score += quesflags[i].score;
        }
        answerflags.length = 0;
        quesflags.length = 0;
        return sol;
    }
    
}
