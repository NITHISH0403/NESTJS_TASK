import { CreateUserInputs } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInputs extends PartialType(CreateUserInputs) {
  @Field()
  id: string;

  @Field()
  fullname: string;

  @Field()
  phoneNumber: number;

  @Field({nullable: true})
  updatedAt: Date;

  @Field({nullable:true})
  deletedAt: Date;
}
