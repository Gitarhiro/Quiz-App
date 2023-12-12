
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../question/entities/Question";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Answer{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field({nullable: true})
    contents: string;

    @Column({default: false})
    @Field({defaultValue: false})
    isCorrect: boolean;

    @Column({nullable: true}) // FOR SORTING ANSWERS
    @Field((type) => Int, {nullable: true})
    sortOrder: number;

    @ManyToOne(() => Question, (question) => question.answers, {
        onDelete: 'CASCADE',
        orphanedRowAction: "delete" // NEW
      })
    @JoinColumn({name: 'ques_id'})
    question: Question;
}