import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInputs } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Mutation(()=>Post)
  public async updatePost(
    @Args('updatePostInputs') updatePostInputs: UpdatePostInputs,
  ){
    return await this.postService.updatePost(updatePostInputs.id, updatePostInputs);
  }

  @Mutation(()=>Post)
  public async deletePost(
    @Args('id') id:string,
  ){
    return await this.postService.deletePost(id);
  }

  @Query(()=>[Post])
  public async getAllPost(){
    return await this.postService.getAllPost();
  }

  @Query(() => Post)
  public async getPostById(@Args('id') id: string) {
    return this.postService.getPostById(id);
  }
}
