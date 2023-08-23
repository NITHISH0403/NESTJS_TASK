import { Injectable } from '@nestjs/common/decorators';
import { BaseRepository } from 'src/database/base.respoitory';
import { DataSource } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { UpdatePostInputs } from './dto/update-post.input';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(createPostInput: CreatePostInput) {
    const userId = createPostInput.userId;

    const postCount = await this.createQueryBuilder("post")
      .where("post.userId = :userId", { userId })
      .getCount();

    const newPost = this.create({
      postName: createPostInput.postName,
      postOrderNumber: postCount + 1,
      userId: userId,
    });

    return await this.save(newPost);
  }

  public async updatePost(id: string, updatePostInputs: UpdatePostInputs) {
    const updatePost = await this.findOne({ where: { id } })

    if (!updatePost) {
      throw new Error(`User with ID ${id} not found.`);
    }

    updatePost.postName = updatePostInputs.postName;
    updatePost.updatedAt = new Date();

    return await this.save(updatePost);
  }

  public async deletePost(id: string) {
    const deletePost = await this.findOne({ where: { id } })
    const deletedPostUserId = deletePost.userId;
    const deletedPostOrderNumber = deletePost.postOrderNumber;

    if (!deletePost) {
      throw new Error(`User with ID ${id} not found.`);
    }

    await this.softDelete(id);

    const updatePost = await this.createQueryBuilder("post")
      .update()
      .set({ postOrderNumber: () => "postOrderNumber - 1" })
      .where("post.user_id = :deletedPostUserId and postOrderNumber > :deletedPostOrderNumber", { deletedPostUserId, deletedPostOrderNumber })
      .execute();

    if(updatePost){
      throw new Error('Updated successfully');
    }
  }

  public async getAllPost() {
    return await this.find({ relations: ['user'] });
  }

}
