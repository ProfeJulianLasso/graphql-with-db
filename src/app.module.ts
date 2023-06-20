import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { PostgreSQLModule } from './database/postgresql.module';
import { BackendResolver } from './resolvers/backend.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'graphql', 'schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PostgreSQLModule,
  ],
  controllers: [],
  providers: [BackendResolver],
})
export class AppModule {}
