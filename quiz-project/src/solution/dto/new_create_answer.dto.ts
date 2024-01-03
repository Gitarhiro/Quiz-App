import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewCreateAnswerDto{

    @Field((type) => Int)
    questionId: number

    @Field()
    contents: string;

    @Field((type) => Int, {nullable: true})
    sortOrder: number;
}