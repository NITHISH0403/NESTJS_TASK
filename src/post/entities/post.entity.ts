import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@ObjectType()
@Entity({ name: 'post' })
export class Post {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  id: string;

  @Field()
  @Column({ name: 'post_name' })
  postName: string;

  @Field(()=>Int,{nullable: true})
  @Column({name:'postOrderNumber', type: 'integer'})
  postOrderNumber: number;

  @Field({nullable:true})
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', nullable: true })
  createdAt: Date;

  @Field({nullable:true})
  @Column({ name: 'updatedAt', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Field({nullable:true})
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable:true })
  deletedAt: Date;

  @Field()
  @ManyToOne(() => User, (user) => user.post,{onDelete: 'CASCADE'}) 
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @Column({ name: 'user_id' })
  userId: string;
}
