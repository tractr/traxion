import { AlertFeedbackQualification } from '../../generated';
import { AlertFeedback } from '../../models';

/**
 * Validate that isPertinent property of an alert feedback
 * @param feedback - feedback to validate
 * @returns True if the isPertinent property is valid, else return
 * false
 */
export function validateAlertFeedbackIsPertinent({
  qualification,
  isPertinent,
}: Partial<AlertFeedback>) {
  // Is pertinent can only be false when qualification is 'nothingSuspect'
  return !(
    qualification !== AlertFeedbackQualification.nothingSuspect &&
    isPertinent === false
  );
}
