import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn } from "class-validator";
import { CreateAnswerDto } from "src/answer/dto/create_answer.dto";

@InputType()
export class CreateQuestionDto {

    
    @Field()
    @IsIn(['single', 'multiple', 'sorting', 'open'])
    type: string;

    @Field()
    content: string;
    
    @Field((type) => Int)
    quiz_id: number;

    @Field(()=> [CreateAnswerDto])
    answers: CreateAnswerDto[];
}