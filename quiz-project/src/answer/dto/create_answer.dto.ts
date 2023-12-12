import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateAnswerDto{

    @Field()
    contents: string;

    @Field({defaultValue: false})
    isCorrect: boolean;

    @Field((type) => Int, {nullable: true})
    sortOrder: number;

    @Field((type) => Int)
    ques_id: number;

}