import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import {
  Answer,
  Enterprise,
  Tag,
  UniqueValueField,
  User,
} from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import {
  GraphQLModelsModule,
  UserResolver,
} from '@tractr/generated-nestjs-graphql';
import {
  ANSWER_SERVICE,
  AnswerService,
  ENTERPRISE_SERVICE,
  EnterpriseService,
  TAG_SERVICE,
  TagService,
  UNIQUE_VALUE_FIELD_SERVICE,
  UniqueValueFieldService,
  USER_SERVICE,
  UserService,
} from '@tractr/generated-nestjs-models-common';

describe('User Resolver', () => {
  let app: INestApplication;
  let mockUserService: MockProxy<UserService>;
  let mockAnswerService: MockProxy<AnswerService>;
  let mockEnterpriseService: MockProxy<EnterpriseService>;
  let mockTagService: MockProxy<TagService>;
  let mockUniqueValueFieldService: MockProxy<UniqueValueFieldService>;
  let mockUser: User;
  let mockAnswer: Answer;
  let mockEnterprise: Enterprise;
  let mockTag: Tag;
  let mockUniqueValueField: UniqueValueField;

  beforeAll(async () => {
    mockUserService = mockDeep<UserService>();

    const module = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: USER_SERVICE,
          useValue: mockUserService,
        },
        {
          provide: ANSWER_SERVICE,
          useValue: mockUserService,
        },
        {
          provide: ENTERPRISE_SERVICE,
          useValue: mockUserService,
        },
        {
          provide: TAG_SERVICE,
          useValue: mockUserService,
        },
        {
          provide: UNIQUE_VALUE_FIELD_SERVICE,
          useValue: mockUserService,
        },
      ],
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: 'schema.gql',
          sortSchema: true,
          debug: true,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await module.init();
  });
  afterAll(async () => {
    await app.close();
  });
  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
