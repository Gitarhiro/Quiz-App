import { Field, InputType, Int } from "@nestjs/graphql";
import { NewCreateAnswerDto } from "src/answer/dto/new_create_answer.dto";
import { Answer } from "src/answer/entities/Answer";

@InputType()
export class InputSolution { 

    @Field(()=> Int)
    quiz_id: number;

    @Field(()=> [NewCreateAnswerDto])
    answers: NewCreateAnswerDto[];
}