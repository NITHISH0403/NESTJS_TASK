import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Field()
  @Column({ name: 'user_name', type: 'varchar' })
  fullname: string;

  @Field()
  @Column({ name: 'phoneNumber', type: 'numeric' })
  phoneNumber: number;

  @Field({nullable:true})
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', nullable:true  })
  createdAt: Date;

  @Field({nullable:true})
  @Column({ name: 'updatedAt', type: 'timestamp', nullable:true })
  updatedAt: Date;

  @Field({nullable:true})
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable:true })
  deletedAt: Date;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user,{cascade:true})
  post: Post[];
}
