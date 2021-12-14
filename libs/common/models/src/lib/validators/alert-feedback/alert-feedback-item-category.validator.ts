import { AlertFeedbackQualification } from '../../generated';
import { AlertFeedback } from '../../models';

import { isNullOrUndefined } from '@cali/common-business';

const nonThiefQualifications = [
  AlertFeedbackQualification.dissuasion,
  AlertFeedbackQualification.nothingSuspect,
  AlertFeedbackQualification.suspectBehavior,
] as AlertFeedbackQualification[];

/**
 * Validate itemCategoryId property of an alert feedback
 * @param feedback - feedback to validate
 * @returns True if the itemCategoryId is valid, else return
 * false
 */
export function validateAlertFeedbackItemCategory({
  itemCategory,
  itemCategoryId,
  qualification,
}: Partial<AlertFeedback>) {
  return !(
    (!isNullOrUndefined(itemCategoryId) || !isNullOrUndefined(itemCategory)) &&
    (isNullOrUndefined(qualification) ||
      nonThiefQualifications.includes(qualification))
  );
}
