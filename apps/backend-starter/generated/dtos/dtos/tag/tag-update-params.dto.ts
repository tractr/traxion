import {
  IsString,
  IsUUID,
} from 'class-validator';

export class TagUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
