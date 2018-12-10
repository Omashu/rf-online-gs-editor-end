import * as GraphQLJSON from 'graphql-type-json';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateTimeScalar } from './graphql/scalars/DateTime.scalar';

import { RolesModule } from './api/roles/roles.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { JSON: GraphQLJSON },
    }),
    TypeOrmModule.forRoot(),
    RolesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateTimeScalar],
})
export class AppModule {}
