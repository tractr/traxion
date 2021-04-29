import {
  IsString,
  IsUUID,
} from 'class-validator';

export class MessageDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
