import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Question } from "../../question/entities/Question";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";


@Entity()
@ObjectType()
export class Quiz {

    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    topic: string;

    @OneToMany(() => Question, (question) => question.quiz, {cascade: true})
    @JoinTable()
    @Field(()=> [Question], {nullable: true})
    questions?: Question[];
}