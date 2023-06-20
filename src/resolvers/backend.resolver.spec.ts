import { Test, TestingModule } from '@nestjs/testing';
import { RoleRepository } from '../database/repositories/role.repository';
import { UserRepository } from '../database/repositories/user.repository';
import { BackendResolver } from './backend.resolver';

describe('BackendResolver', () => {
  let resolver: BackendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BackendResolver,
        {
          provide: UserRepository,
          useValue: {},
        },
        {
          provide: RoleRepository,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<BackendResolver>(BackendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
