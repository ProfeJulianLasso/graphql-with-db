import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity('test_role', { schema: 'public' })
export class Role {
  @Field(() => String)
  @Column('uuid', {
    primary: true,
    name: 'role_id',
    default: () => 'uuid_generate_v4()',
  })
  roleId: string;

  @Field(() => String)
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Field(() => String)
  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  users: User[];
}
