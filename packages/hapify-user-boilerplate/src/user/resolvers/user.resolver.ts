import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateDto, UserReadManyDto, UserUpdateDto } from '../dtos';
import { User } from './models';
import { UserService } from '../services';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  public async create(
    @Args('createUserInput') data: UserCreateDto
  ): Promise<User> {
    return this.userService.create(data);
  }

  @Query(() => [User], { name: 'user' })
  public async readMany(@Args() filters: UserReadManyDto): Promise<User[]> {
    const where = this.userService.searchDtoToSearchParams(filters);
    return this.userService.readMany(where);
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async update(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateUserInput') data: UserUpdateDto
  ): Promise<User> {
    return this.userService.update({ id }, data);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  public async delete(
    @Args('id', { type: () => ID }) id: number
  ): Promise<User> {
    return this.userService.delete({ id });
  }
}
