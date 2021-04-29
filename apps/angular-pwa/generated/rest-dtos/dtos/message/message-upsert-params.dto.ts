import {
  IsString,
  IsUUID,
} from 'class-validator';

export class MessageUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
