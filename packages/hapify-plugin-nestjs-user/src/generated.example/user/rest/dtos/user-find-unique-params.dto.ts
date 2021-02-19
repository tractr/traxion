import { IsString } from 'class-validator';

export class UserFindUniqueParamsDto {
  @IsString()
  id!: string;
}
