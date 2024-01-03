import { Field, InputType } from "@nestjs/graphql";
import { CreateQuestionDto } from "src/question/dto/create_question.dto";

@InputType()
export class CreateQuizDto {
    @Field()
    name: string;

    @Field()
    topic: string;

    @Field(()=> [CreateQuestionDto])
    questions: CreateQuestionDto[];
}