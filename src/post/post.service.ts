/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PostRepository } from './post.repository';
import { UpdatePostInputs } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepository) {}

  public async create(createPostInput: CreatePostInput) {
    return await this.postRepo.createPost(createPostInput);
  }

  public async updatePost(id: string, updatePostInputs: UpdatePostInputs){
    return await this.postRepo.updatePost(id, updatePostInputs);
  }

  public async deletePost(id: string){
    return await this.postRepo.deletePost(id);
  }

  public async getAllPost(){
    return this.postRepo.getAllPost();
  }

  public async getPostById(id:string) {
    const getUserById = await this.postRepo.findOne({ where: { id } })

    if (!getUserById) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'p')
      .where('post.id = :id', {id})
      .getOne();
  }
}
