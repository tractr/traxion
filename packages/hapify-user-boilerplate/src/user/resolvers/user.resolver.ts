import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dtos';
import { User } from './models';
import { UserService } from '../services';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  public async create(
    @Args('createUserInput') data: CreateUserDto
  ): Promise<User> {
    return this.userService.create(data);
  }

  @Query(() => [User], { name: 'user' })
  public async read(@Args() filters: ReadUserDto): Promise<User[]> {
    return this.userService.read(filters);
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async update(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateUserInput') data: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  public async delete(
    @Args('id', { type: () => ID }) id: number
  ): Promise<User> {
    return this.userService.delete(id);
  }
}
