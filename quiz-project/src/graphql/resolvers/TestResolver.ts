import { Resolver , Query, Args, Int } from '@nestjs/graphql';
import { Test } from '../models/Test';
import { mockTests } from 'src/__mocks__/mockTests';

@Resolver()
export class TestResolver{

    @Query((returns) => Test)
    getTest(){
        return {
            id: 1,
            name: 'basic',
            subject: 'math',
            isActive: 1
        }
    }
    @Query((returns) => Test)
    getTestbyID(@Args('id', { type: ()=>Int}) id: number){
        return mockTests.find((Test) => Test.id === id);
    }

    @Query(()=>[Test])
    getTests(){
        return mockTests;
    }
}