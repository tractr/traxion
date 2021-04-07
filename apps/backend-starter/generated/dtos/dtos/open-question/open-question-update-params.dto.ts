import {
  IsString,
  IsUUID,
} from 'class-validator';

export class OpenQuestionUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
