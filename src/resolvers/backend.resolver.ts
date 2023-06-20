import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/database/entities/role.entity';
import { User } from 'src/database/entities/user.entity';
import { RoleRepository } from 'src/database/repositories/role.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserUpdateDto } from 'src/dto/user-update.input';
import { UserDto } from 'src/dto/user.input';

@Resolver('Backend')
export class BackendResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  @Query(() => [User], { name: 'getAllUsers', description: 'Get all users' })
  getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Query(() => [Role], { name: 'getAllRoles', description: 'Get all roles' })
  getAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  @Query(() => User, { name: 'getUser', description: 'Get user by id' })
  getUser(
    @Args('userId', { description: 'UUID from user to find' }) id: string,
  ): Promise<User> {
    return this.userRepository.findOne(id);
  }

  @Mutation(() => User, {
    name: 'createUser',
    description: 'Create a new user',
  })
  createUser(@Args('user') user: UserDto): Promise<User> {
    const newUser = new User();
    newUser.roleId = user.roleId;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    return this.userRepository.create(newUser);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Update a user',
  })
  updateUser(
    @Args('userId', { description: 'UUID from user to update' }) id: string,
    @Args('user') user: UserUpdateDto,
  ): Promise<User> {
    return this.userRepository.update(id, user as User);
  }

  @Mutation(() => User, {
    name: 'deleteUser',
    description: 'Delete a user',
  })
  deleteUser(
    @Args('userId', { description: 'UUID from user to delete' }) id: string,
  ): Promise<User> {
    return this.userRepository.delete(id);
  }
}
