import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RoleRepository } from './repositories/role.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'test1',
      entities: [User, Role],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [UserRepository, RoleRepository],
  exports: [TypeOrmModule, UserRepository, RoleRepository],
})
export class PostgreSQLModule {}
