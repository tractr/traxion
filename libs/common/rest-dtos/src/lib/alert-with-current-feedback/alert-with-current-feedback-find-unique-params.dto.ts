import { IsString, IsUUID } from 'class-validator';

export class AlertWithCurrentFeedbackFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
