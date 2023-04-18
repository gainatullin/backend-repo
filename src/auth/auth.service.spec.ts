import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    // getById: () => Promise.resolve(),
    // getByEmailWithPassword: (user) => console.log('user', user),
    getByEmailWithPassword: jest.fn().mockImplementation((user) => user),
    // search: () => Promise.resolve([]),
    // create: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('example', async () => {
    expect(
      await service.signIn({
        credential: 'marsel@mail.ru',
        passwordHash: '1234',
      }),
    ).toEqual(true);
  });
});
