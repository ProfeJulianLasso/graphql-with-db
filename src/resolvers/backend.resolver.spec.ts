import { Test, TestingModule } from '@nestjs/testing';
import { BackendResolver } from './backend.resolver';

describe('BackendResolver', () => {
  let resolver: BackendResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendResolver],
    }).compile();

    resolver = module.get<BackendResolver>(BackendResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
