import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateDto {
  @Field(() => String, { nullable: true })
  roleId?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}
