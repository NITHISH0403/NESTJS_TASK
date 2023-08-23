import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.respoitory';
import { DataSource } from 'typeorm';
import { CreateUserInputs } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UpdateUserInputs } from './dto/update-user.input';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(createUserInputs: CreateUserInputs) {
    const newUser = this.create({
      fullname: createUserInputs.fullname,
      phoneNumber: createUserInputs.phoneNumber,
      
    });

    return this.save(newUser);

  }

  public async updateUser(id: string, updateUserInputs: UpdateUserInputs) {
    const updateUser = await this.findOne({ where: { id } })

    if (!updateUser) {
      throw new Error(`User with ID ${id} not found.`);
    }

    updateUser.fullname = updateUserInputs.fullname;
    updateUser.phoneNumber = updateUserInputs.phoneNumber;
    updateUser.updatedAt = new Date();

    return await this.save(updateUser);
  }

  public async deleteUser(id: string) {
    const deletedUser = await this.findOne({ where: { id }})

    if (!deletedUser) {
      throw new Error(`User with ID ${id} not found.`);
    }

    this.softDelete(id);
  
  }

  public async getAllUser(){
    return await this.find({relations:['post']});
  }

}
