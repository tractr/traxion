import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Role } from '../role/role.model';
import { Profile } from '../profile/profile.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Role, { nullable: false })
  role?: Role;

  @Field(() => Profile, { nullable: true })
  userProfile?: Profile | null;
}
