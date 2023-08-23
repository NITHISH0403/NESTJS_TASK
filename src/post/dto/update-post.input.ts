import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInputs extends PartialType(CreatePostInput) {
  @Field()
  id: string;

  @Field()
  postName: string;

  @Field(()=>Int,{nullable: true})
  postOrderNumber: number;

  @Field({nullable:true})
  updatedAt: Date;

  @Field({nullable:true})
  deletedAt: Date;
}
