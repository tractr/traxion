import { AlertFeedbackQualification } from '../../generated';
import { AlertFeedback } from '../../models';

import { isNullOrUndefined } from '@cali/common-business';

const nonThiefQualifications = [
  AlertFeedbackQualification.dissuasion,
  AlertFeedbackQualification.nothingSuspect,
  AlertFeedbackQualification.suspectBehavior,
] as AlertFeedbackQualification[];

/**
 * Validate thiefValue property of an alert feedback
 * @param feedback - feedback to validate
 * @returns True if the thiefValue is valid, else return
 * false
 */
export function validateAlertFeedbackThiefValue({
  thiefValue,
  qualification,
}: Partial<AlertFeedback>) {
  return !(
    !isNullOrUndefined(thiefValue) &&
    (isNullOrUndefined(qualification) ||
      nonThiefQualifications.includes(qualification))
  );
}
