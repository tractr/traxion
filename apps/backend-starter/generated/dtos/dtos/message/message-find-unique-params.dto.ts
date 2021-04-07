import {
  IsString,
  IsUUID,
} from 'class-validator';

export class MessageFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
