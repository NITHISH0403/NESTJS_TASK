import { Injectable } from '@nestjs/common';
import { CreateUserInputs } from './dto/create-user.input';
import { UserRepository } from './user.repository';
import { UpdateUserInputs } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async createUser(createUserInputs: CreateUserInputs) {
    return this.userRepo.createUser(createUserInputs);
  }

  public async updateUser(id: string, updateUserInputs: UpdateUserInputs){
    return this.userRepo.updateUser(id, updateUserInputs);
  }

  public async deleteUser(id: string){
    return this.userRepo.deleteUser(id);
  }

  public async getAllUser(){
    return this.userRepo.getAllUser();
  }

  public async getUserById(id:string) {
    // select * from users left join post on user.user_id = post.user_id where users.user_id = ''
    const getUserById = await this.userRepo.findOne({ where: { id } })

    if (!getUserById) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.post', 'u')
      .where('user.id =:id', { id })
      .getOne();
  }
}
