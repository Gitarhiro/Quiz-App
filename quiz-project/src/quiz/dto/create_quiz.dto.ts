import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateQuizDto {
    @Field()
    name: string;

    @Field()
    topic: string;
}