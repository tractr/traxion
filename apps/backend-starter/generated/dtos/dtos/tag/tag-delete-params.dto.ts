import {
  IsString,
  IsUUID,
} from 'class-validator';

export class TagDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
