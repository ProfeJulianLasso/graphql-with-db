import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@ObjectType()
@Entity('test_user', { schema: 'public' })
export class User {
  @Field(() => String, { description: 'UUID from user' })
  @Column('uuid', {
    primary: true,
    name: 'user_id',
    default: () => 'uuid_generate_v4()',
  })
  userId: string;

  @Field(() => String, { description: 'UUID from role' })
  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @Field(() => String, { description: 'User first name' })
  @Column('varchar', { name: 'first_name', length: 255 })
  firstName: string;

  @Field(() => String, { description: 'User last name' })
  @Column('varchar', { name: 'last_name', length: 255 })
  lastName: string;

  @Field(() => Role, { description: 'User role' })
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Role;
}
