import { IsBoolean } from 'class-validator';

export class UserFindUniqueQueryDto {
  @IsBoolean()
  UserProfile = false;
}
