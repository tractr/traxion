import {
  IsString,
  IsUUID,
} from 'class-validator';

export class OpenQuestionDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
