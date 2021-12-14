import { CustomValidate } from '@tractr/common';

import {
  AlertFeedbackQualification,
  AlertFeedback as BaseAlertFeedback,
} from '../generated';
import {
  validateAlertFeedbackIsArchived,
  validateAlertFeedbackIsPertinent,
  validateAlertFeedbackItemCategory,
  validateAlertFeedbackQualification,
  validateAlertFeedbackThiefValue,
} from '../validators';

export class AlertFeedback extends BaseAlertFeedback {
  @CustomValidate(validateAlertFeedbackQualification)
  qualification: AlertFeedbackQualification | null = null;

  @CustomValidate(validateAlertFeedbackIsPertinent)
  isPertinent = true;

  @CustomValidate(validateAlertFeedbackItemCategory)
  itemCategoryId: string | null = null;

  @CustomValidate(validateAlertFeedbackThiefValue)
  thiefValue: number | null = null;

  @CustomValidate(validateAlertFeedbackIsArchived)
  isArchived = false;
}
