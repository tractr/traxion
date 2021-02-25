import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@tractr/hapify-plugin-nestjs-database';

describe('DatabaseService', () => {
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(databaseService).toBeDefined();
  });

  it('should extend PrismaClient', () => {
    expect(databaseService).toBeInstanceOf(PrismaClient);
  });
});
