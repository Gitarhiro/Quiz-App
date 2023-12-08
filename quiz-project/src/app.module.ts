import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TestResolver } from './graphql/resolvers/TestResolver';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'haslo',
      database: 'Quiz',
      entities:[],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [TestResolver],
})
export class AppModule {}
