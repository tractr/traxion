import { AlertFeedbackQualification, AlertFeedbackType } from '@prisma/client';

import { AlertFeedback } from '../../models';

import { isNullOrUndefined } from '@cali/common-business';

const thiefTypes = [
  AlertFeedbackType.thief,
  AlertFeedbackType.suspectBehavior,
] as AlertFeedbackType[];

const thiefQualifications = [
  AlertFeedbackQualification.stopped,
  AlertFeedbackQualification.unstopped,
  AlertFeedbackQualification.dissuasion,
] as AlertFeedbackQualification[];

const falseAlertTypes = [AlertFeedbackType.falseAlert] as AlertFeedbackType[];

const falseAlertQualifications = [
  AlertFeedbackQualification.suspectBehavior,
  AlertFeedbackQualification.nothingSuspect,
] as AlertFeedbackQualification[];

/**
 * Validate qualification property of an alert feedback
 * @param AlertFeedback - Alert feedback to validate
 * @returns True if the qualification field is valid, else
 * return false.
 */
export function validateAlertFeedbackQualification({
  type,
  qualification,
}: Partial<AlertFeedback>) {
  return (
    // Type and qualification can be null
    (isNullOrUndefined(type) && isNullOrUndefined(qualification)) ||
    // Qualification can be null event if type is not null
    (!isNullOrUndefined(type) && isNullOrUndefined(qualification)) ||
    // If type and qualification are defined, they must be of the same category
    (!isNullOrUndefined(type) &&
      !isNullOrUndefined(qualification) &&
      ((thiefTypes.includes(type) &&
        thiefQualifications.includes(qualification)) ||
        (falseAlertTypes.includes(type) &&
          falseAlertQualifications.includes(qualification))))
  );
}
