import { Prisma } from '@prisma/client';
import { IsBoolean, IsOptional } from 'class-validator';

export class UserReadOneDto implements Prisma.UserInclude {
  @IsOptional()
  @IsBoolean()
  UserProfile?: boolean = false;
}
