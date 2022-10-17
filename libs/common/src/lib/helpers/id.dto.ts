import { IsString, IsUUID } from 'class-validator';

export class IdDto {
  @IsString()
  @IsUUID('all')
  id!: string;
}
