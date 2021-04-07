import {
  IsString,
  IsUUID,
} from 'class-validator';

export class TagUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
