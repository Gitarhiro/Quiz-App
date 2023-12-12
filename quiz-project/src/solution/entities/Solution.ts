import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Quiz } from "src/quiz/entities/Quiz";

@ObjectType()
export class Solution {

    @Field(()=>Int,{defaultValue: 0})
    score: number;
}