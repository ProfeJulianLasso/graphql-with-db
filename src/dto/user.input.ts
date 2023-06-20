import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UserDto {
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID' })
  @Field(() => String, { nullable: true, description: 'UUID from user' })
  userId?: string;

  @IsUUID('4', { message: 'Invalid UUID' })
  @Field(() => String, { description: 'UUID from role' })
  roleId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Field(() => String, { description: 'User last name' })
  lastName: string;
}
