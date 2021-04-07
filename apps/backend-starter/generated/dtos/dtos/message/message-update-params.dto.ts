import {
  IsString,
  IsUUID,
} from 'class-validator';

export class MessageUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
