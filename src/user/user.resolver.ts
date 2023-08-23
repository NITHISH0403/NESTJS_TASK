import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInputs } from './dto/create-user.input';
import { UpdateUserInputs } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public async createUser(
    @Args('createUserInputs') createUserInputs: CreateUserInputs,
  ) {
    return this.userService.createUser(createUserInputs);
  }

  @Mutation(()=>User)
  public async updateUser(
    @Args('updateUserInputs') updateUserInputs: UpdateUserInputs,
  ){
    return await this.userService.updateUser(updateUserInputs.id, updateUserInputs);
  }

  @Mutation(()=>User)
  public async deleteUser(
    @Args('id') id:string,
  ){
    return await this.userService.deleteUser(id);
  }

  @Query(()=>[User])
  public async getAllUser(){
    return await this.userService.getAllUser();
  }

  @Query(() => User)
  public async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }
}
