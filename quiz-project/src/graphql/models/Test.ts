import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Test{
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    subject: string;

    @Field()
    isActive:boolean;
}