import { Controller, Get } from '@nestjs/common';

import { DatabaseService } from '../services';

@Controller('prisma')
export class PrimaSchemaController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('schema')
  async getSchema() {
    return 'schema';
  }
}
