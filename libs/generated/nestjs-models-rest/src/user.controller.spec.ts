/* eslint-disable @typescript-eslint/unbound-method */
import { AbilityBuilder } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  INestApplication,
  Injectable,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import * as request from 'supertest';

import {
  USER_REST_DTO_SERVICE,
  UserController,
  UserRestDtoService,
} from './generated/nestjs-models-rest';

import { Actions, AppAbility } from '@tractr/generated-casl';
import {
  mockUserFactory,
  mockUsersFactory,
} from '@tractr/generated-models/mock';
import {
  USER_DATABASE_SERVICE,
  USER_SERVICE,
  UserService,
} from '@tractr/generated-nestjs-models-common';
import {
  UserCreateBodyDto,
  UserUpdateBodyDto,
  UserUpsertBodyDto,
} from '@tractr/generated-rest-dtos';
import { CaslExceptionInterceptor } from '@tractr/nestjs-casl';
import { LoggerModule, TraxionValidationPipe } from '@tractr/nestjs-core';

describe('UserController', () => {
  let app: INestApplication;
  let mockUserDatabaseService: MockProxy<UserService>;
  let mockReqAbilities: jest.Mock<AppAbility>;
  let mockReqUser: jest.Mock<User>;

  beforeAll(async () => {
    mockUserDatabaseService = mockDeep<UserService>();
    mockReqAbilities = jest.fn(undefined);
    mockReqUser = jest.fn(undefined);

    class Guard implements CanActivate {
      canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        req.abilities = mockReqAbilities();
        req.user = mockReqUser();
        return true;
      }
    }
    Injectable()(Guard);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [LoggerModule],
      providers: [
        {
          provide: USER_SERVICE,
          useClass: UserService,
        },
        {
          provide: USER_DATABASE_SERVICE,
          useValue: mockUserDatabaseService,
        },
        {
          provide: USER_REST_DTO_SERVICE,
          useClass: UserRestDtoService,
        },
        { provide: APP_GUARD, useClass: Guard },
        { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new TraxionValidationPipe());

    await app.init();
  });

  afterEach(async () => {
    mockUserDatabaseService.create.mockReset();
    mockUserDatabaseService.count.mockReset();
    mockUserDatabaseService.findMany.mockReset();
    mockUserDatabaseService.findUnique.mockReset();
    mockUserDatabaseService.upsert.mockReset();
    mockUserDatabaseService.delete.mockReset();
    mockReqAbilities.mockReset();
    mockReqUser.mockReset();
    if (app) await app.close();
  });

  it('UserController should be able to be used by nestjs', async () => {
    expect(app.get(UserController)).toBeDefined();
  });

  describe('POST /user', () => {
    it('should create a user', async () => {
      const user: UserCreateBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
        listObject: [],
        object: {},
        roles: ['user'],
      };

      await request(app.getHttpServer()).post('/user').send(user).expect(201);

      expect(mockUserDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.create).toHaveBeenCalledWith({
        data: {
          createdAt: expect.any(Date),
          ...user,
        },
      });
    });
  });

  describe('GET /user/count', () => {
    it('should get the user count', async () => {
      await request(app.getHttpServer()).get('/user/count').expect(200);

      expect(mockUserDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.count).toHaveBeenCalledWith({});
    });

    it('should get the user count with filter', async () => {
      const mockUser = mockUserFactory();

      await request(app.getHttpServer())
        .get('/user/count')
        .query(`id=${mockUser.id}`)
        .query(`createdAt=${mockUser.createdAt.toISOString()}`)
        .query(`name=${mockUser.name}`)
        .query(`email=${mockUser.email}`)
        .query(`listObject=${JSON.stringify(mockUser.listObject)}`)
        .query(`roles=${JSON.stringify(mockUser.roles)}`)
        .expect(200);

      expect(mockUserDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.count).toHaveBeenCalledWith({
        where: {
          id: { equals: mockUser.id },
          createdAt: { equals: mockUser.createdAt },
          name: { equals: mockUser.name },
          email: { equals: mockUser.email },
          listObject: { equals: mockUser.listObject },
          roles: { hasSome: mockUser.roles },
        },
      });
    });

    it('should get the user count with casl abilities filter', async () => {
      const user = mockUserFactory();
      mockReqUser.mockReturnValue(user);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.READ, 'User', { id: user.id });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer()).get('/user/count').expect(200);

      expect(mockUserDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.count).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [{ id: user.id }],
            },
            {},
          ],
        },
      });
    });

    it('should get the user count with casl abilities filter and with filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.READ, 'User', { id: mockUser.id });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer())
        .get('/user/count')
        .query(`id=${mockUser.id}`)
        .query(`createdAt=${mockUser.createdAt.toISOString()}`)
        .query(`name=${mockUser.name}`)
        .query(`email=${mockUser.email}`)
        .query(`listObject=${JSON.stringify(mockUser.listObject)}`)
        .query(`roles=${JSON.stringify(mockUser.roles)}`)
        .expect(200);

      expect(mockUserDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.count).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [{ id: mockUser.id }],
            },
            {
              id: { equals: mockUser.id },
              createdAt: { equals: mockUser.createdAt },
              name: { equals: mockUser.name },
              email: { equals: mockUser.email },
              listObject: { equals: mockUser.listObject },
              roles: { hasSome: mockUser.roles },
            },
          ],
        },
      });
    });
  });

  describe('GET /user/:id', () => {
    it('should return 404 if no user found', async () => {
      const mockUser = mockUserFactory();

      await request(app.getHttpServer())
        .get(`/user/${mockUser.id}`)
        .expect(404);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockUser.id,
        },
      });
    });

    it('should get the user', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      await request(app.getHttpServer())
        .get(`/user/${mockUser.id}`)
        .expect(200);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockUser.id,
        },
      });
    });

    it('should get the user and add populate argument', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      await request(app.getHttpServer())
        .get(`/user/${mockUser.id}`)
        .query('populate=tags')
        .query('populate=answers')
        .expect(200);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: {
          id: mockUser.id,
        },
        include: {
          tags: true,
          answers: true,
        },
      });
    });

    it('should get the user with casl abilities filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.READ, 'User', { id: mockUser.id });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer())
        .get(`/user/${mockUser.id}`)
        .expect(200);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should forbid the user with casl abilities filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.READ, 'User', { id: 'foo' });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer())
        .get(`/user/${mockUser.id}`)
        .expect(403);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });
  });

  describe('GET /user', () => {
    it('should get a list of Users and have default options', async () => {
      const mockUsers = mockUsersFactory({}, 5);
      mockUserDatabaseService.findMany.mockResolvedValue(mockUsers);

      const res = await request(app.getHttpServer()).get('/user').expect(200);

      expect(res.body.length).toEqual(mockUsers.length);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        take: 100,
      });
    });

    it('should get a list of Users and take a specific number them', async () => {
      await request(app.getHttpServer())
        .get('/user')
        .query('take=5')
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        take: 5,
      });
    });

    it('should get a list of Users and skip a specific number them', async () => {
      await request(app.getHttpServer())
        .get('/user')
        .query('skip=5')
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        skip: 5,
        take: 100,
      });
    });

    it('should get a list of Users and order by them', async () => {
      await request(app.getHttpServer())
        .get('/user')
        .query('sort=createdAt')
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'asc' },
        take: 100,
      });
    });

    it('should get a list of Users and order by them desc', async () => {
      await request(app.getHttpServer())
        .get('/user')
        .query('order=desc&sort=id&sort=createdAt:asc')
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'desc', createdAt: 'asc' },
        take: 100,
      });
    });

    it('should get a list of Users and filter them with value', async () => {
      const mockUser = mockUserFactory();

      await request(app.getHttpServer())
        .get('/user')
        .query(`id=${mockUser.id}`)
        .query(`createdAt=${mockUser.createdAt.toISOString()}`)
        .query(`name=${mockUser.name}`)
        .query(`email=${mockUser.email}`)
        .query(`listObject=${JSON.stringify(mockUser.listObject)}`)
        .query(`roles=${JSON.stringify(mockUser.roles)}`)
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        where: {
          id: { equals: mockUser.id },
          createdAt: { equals: mockUser.createdAt },
          name: { equals: mockUser.name },
          email: { equals: mockUser.email },
          listObject: { equals: mockUser.listObject },
          roles: { hasSome: mockUser.roles },
        },
        orderBy: { id: 'asc' },
        take: 100,
      });
    });

    it('should get a list of Users and populate', async () => {
      await request(app.getHttpServer())
        .get('/user')
        .query(`populate=answers`)
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
        take: 100,
        include: {
          answers: true,
        },
      });
    });

    it('should get a list of Users and combine all query params', async () => {
      const user = mockUserFactory();

      await request(app.getHttpServer())
        .get('/user')
        .query(
          `id=${user.id}:contains&skip=5&take=5&sort=id&sort=createdAt:asc&order=desc`,
        )
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        where: { id: { contains: user.id } },
        skip: 5,
        take: 5,
        orderBy: { id: 'desc', createdAt: 'asc' },
      });
    });

    it('should get the users with casl abilities', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.READ, 'User', { id: mockUser.id });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer()).get('/user').expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [{ id: mockUser.id }],
            },
            {},
          ],
        },
        take: 100,
        orderBy: { id: 'asc' },
      });
    });

    it('should get the users with casl abilities and filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.READ, 'User', { id: mockUser.id });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer())
        .get('/user')
        .query(`id=${mockUser.id}`)
        .query(`createdAt=${mockUser.createdAt.toISOString()}`)
        .query(`name=${mockUser.name}`)
        .query(`email=${mockUser.email}`)
        .query(`listObject=${JSON.stringify(mockUser.listObject)}`)
        .query(`roles=${JSON.stringify(mockUser.roles)}`)
        .expect(200);

      expect(mockUserDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [{ id: mockUser.id }],
            },
            {
              id: { equals: mockUser.id },
              createdAt: { equals: mockUser.createdAt },
              name: { equals: mockUser.name },
              email: { equals: mockUser.email },
              listObject: { equals: mockUser.listObject },
              roles: { hasSome: mockUser.roles },
            },
          ],
        },
        take: 100,
        orderBy: { id: 'asc' },
      });
    });
  });

  describe('PATCH /user/:id', () => {
    it('should update a user', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const user: UserUpdateBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
      };

      await request(app.getHttpServer())
        .patch(`/user/${mockUser.id}`)
        .send(user)
        .expect(200);

      expect(mockUserDatabaseService.update).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          ...user,
        },
      });
    });

    it('should return 404 if no user found', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(null);

      const user: UserUpdateBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
      };

      await request(app.getHttpServer())
        .patch(`/user/${mockUser.id}`)
        .send(user)
        .expect(404);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should update the user with casl abilities filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.UPDATE, 'User', { id: mockUser.id });
      mockReqAbilities.mockReturnValue(build());

      const user: UserUpdateBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
      };

      await request(app.getHttpServer())
        .patch(`/user/${mockUser.id}`)
        .send(user)
        .expect(200);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should forbid the user with casl abilities filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.UPDATE, 'User', { id: 'foo' });
      mockReqAbilities.mockReturnValue(build());

      const user: UserUpdateBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
      };

      await request(app.getHttpServer())
        .patch(`/user/${mockUser.id}`)
        .send(user)
        .expect(403);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });
  });

  describe('PUT /user(/:id)?', () => {
    it('should update a user', async () => {
      const mockUser = mockUserFactory();

      const user: UserUpsertBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
        object: {},
        listObject: [],
        roles: ['user'],
      };

      await request(app.getHttpServer())
        .put(`/user/${mockUser.id}`)
        .send({
          ...user,
        })
        .expect(200);

      expect(mockUserDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.upsert).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        create: {
          createdAt: expect.any(Date),
          ...user,
        },
        update: {
          ...user,
        },
      });
    });

    it('should create a user if no id is provided', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const user: UserUpsertBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
        object: {},
        listObject: [],
        roles: ['user'],
      };

      await request(app.getHttpServer()).put(`/user`).send(user).expect(200);

      expect(mockUserDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.upsert).toHaveBeenCalledWith({
        where: {},
        create: {
          createdAt: expect.any(Date),
          ...user,
        },
        update: {
          ...user,
        },
      });
    });

    it('should update a user if an id is provided', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const user: UserUpsertBodyDto = {
        name: 'Foo Bar',
        email: 'foo@bar.com',
        object: {},
        listObject: [],
        roles: ['user'],
      };

      await request(app.getHttpServer()).put(`/user`).send(user).expect(200);

      expect(mockUserDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.upsert).toHaveBeenCalledWith({
        where: {},
        create: {
          createdAt: expect.any(Date),
          ...user,
        },
        update: {
          ...user,
        },
      });
    });
  });

  describe('DELETE /user/:id', () => {
    it('should delete a user', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      await request(app.getHttpServer())
        .delete(`/user/${mockUser.id}`)
        .expect(200);

      expect(mockUserDatabaseService.delete).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.delete).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should return 404 if no user found', async () => {
      const mockUser = mockUserFactory();
      mockUserDatabaseService.findUnique.mockResolvedValue(null);

      await request(app.getHttpServer())
        .delete(`/user/${mockUser.id}`)
        .expect(404);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should delete the user with casl abilities filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.REMOVE, 'User', { id: mockUser.id });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer())
        .delete(`/user/${mockUser.id}`)
        .expect(200);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should forbid the user with casl abilities filter', async () => {
      const mockUser = mockUserFactory();
      mockReqUser.mockReturnValue(mockUser);
      mockUserDatabaseService.findUnique.mockResolvedValue(mockUser);

      const { can, build } = new AbilityBuilder(AppAbility);
      can(Actions.UPDATE, 'User', { id: 'foo' });
      mockReqAbilities.mockReturnValue(build());

      await request(app.getHttpServer())
        .delete(`/user/${mockUser.id}`)
        .expect(403);

      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockUserDatabaseService.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });
  });
});
