import { IsBoolean, IsOptional } from 'class-validator';

export class UserFindUniqueQueryDto {
  @IsOptional()
  @IsBoolean()
  UserProfile?: boolean = false;
}
