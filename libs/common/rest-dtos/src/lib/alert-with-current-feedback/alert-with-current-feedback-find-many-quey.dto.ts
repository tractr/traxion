import {
  TransformStringToBoolean,
  TransformStringToDate,
  TransformStringToInt,
} from '@tractr/common';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import {
  AlertFeedback,
  AlertFeedbackQualification,
  AlertFeedbackType,
  AlertType,
  SortOrder,
} from '@cali/common-models';

export class AlertWithCurrentFeedbackFindManyQueryDto {
  /**
   * UUID of the alert to find
   */
  @IsString()
  @IsOptional()
  id?: string;

  /**
   * Creation date of the alert (exact match)
   */
  @IsDate({})
  @TransformStringToDate()
  @IsOptional()
  createdAt?: Date;

  /**
   * Min creation date of the alert (exact match)
   */
  @IsDate({})
  @TransformStringToDate()
  @IsOptional()
  createdAtMin?: Date;

  /**
   * Max creation date of the alert (exact match)
   */
  @IsDate({})
  @TransformStringToDate()
  @IsOptional()
  createdAtMax?: Date;

  /**
   * Type of the alerts to find
   */
  @IsString()
  @IsIn(Object.values(AlertType))
  @IsOptional()
  alertType?: AlertType;

  /**
   * Type of the last alert feedback
   */
  @IsString()
  @IsIn(Object.values(AlertFeedbackType))
  @IsOptional()
  alertFeedbackType?: AlertFeedbackType;

  /**
   * Qualification of the last alert feedback
   */
  @IsString()
  @IsIn(Object.values(AlertFeedbackQualification))
  @IsOptional()
  qualification?: AlertFeedbackQualification;

  /**
   * Status isArchived of the last alert feedback
   */
  @IsBoolean()
  @TransformStringToBoolean()
  @IsOptional()
  isArchived?: boolean;

  /**
   * Status isPertinent of the last alert feedback
   */
  @IsBoolean()
  @TransformStringToBoolean()
  @IsOptional()
  isPertinent?: boolean;

  /**
   * Camera responsible of the alert
   */
  @IsString()
  @IsUUID('all')
  @IsOptional()
  camera?: string;

  /**
   * Sort by specified key
   */
  @IsOptional()
  @IsString()
  @IsIn(['id', 'createdAt'])
  sort: keyof AlertFeedback = 'id';

  /**
   * Sort order
   */
  @IsOptional()
  @IsIn(Object.values(SortOrder))
  order: SortOrder = 'asc';

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  @TransformStringToInt()
  take = 100;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  @TransformStringToInt()
  skip = 0;
}
