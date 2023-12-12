import { Module } from '@nestjs/common';
import { SolutionResolver } from './solution.resolver';
import { SolutionService } from './solution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/Answer';

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    providers: [SolutionService, SolutionResolver]
})
export class SolutionModule {}
