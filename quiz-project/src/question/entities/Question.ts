import { Quiz } from "../../quiz/entities/Quiz";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "../../answer/entities/Answer";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Question{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    type: string; //TYPES ARE: single, multiple, sorting, open.

    @Column()
    @Field()
    content: string;


    @ManyToOne(() => Quiz, (quiz) => quiz.questions , {
        onDelete: 'CASCADE',
        orphanedRowAction: "delete" // NEW
      })
    @JoinColumn({name: 'quiz_id'})
    @Field( ()=> [Quiz])
    quiz: Quiz;

    @OneToMany(() => Answer, (answer) => answer.question)
    @Field(()=> [Answer])
    answers: Answer[];
}