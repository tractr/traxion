import { CustomValidate } from '@tractr/common';

import { AlertFeedbackCreateBodyDto as BaseAlertFeedbackCreateBodyDto } from '../generated';

import {
  AlertFeedbackQualification,
  validateAlertFeedbackIsArchived,
  validateAlertFeedbackIsPertinent,
  validateAlertFeedbackItemCategory,
  validateAlertFeedbackQualification,
  validateAlertFeedbackThiefValue,
} from '@cali/common-models';

export class AlertFeedbackCreateBodyDto extends BaseAlertFeedbackCreateBodyDto {
  @CustomValidate(validateAlertFeedbackQualification)
  qualification?: AlertFeedbackQualification;

  @CustomValidate(validateAlertFeedbackIsPertinent)
  isPertinent!: boolean;

  @CustomValidate(validateAlertFeedbackItemCategory)
  itemCategoryId: string | null = null;

  @CustomValidate(validateAlertFeedbackThiefValue)
  thiefValue?: number;

  @CustomValidate(validateAlertFeedbackIsArchived)
  isArchived!: boolean;
}
