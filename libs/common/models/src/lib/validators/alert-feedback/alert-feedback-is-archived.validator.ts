import { AlertFeedbackQualification } from '../../generated';
import { AlertFeedback } from '../../models';

import { isNullOrUndefined } from '@cali/common-business';

const thiefQualifications = [
  AlertFeedbackQualification.stopped,
  AlertFeedbackQualification.unstopped,
] as AlertFeedbackQualification[];

export function validateAlertFeedbackIsArchived({
  isArchived,
  type,
  qualification,
  isPertinent,
  itemCategoryId,
  thiefValue,
}: Partial<AlertFeedback>) {
  return !(
    isArchived &&
    (isNullOrUndefined(type) ||
      isNullOrUndefined(qualification) ||
      isNullOrUndefined(isPertinent) ||
      (thiefQualifications.includes(qualification) &&
        (isNullOrUndefined(itemCategoryId) || isNullOrUndefined(thiefValue))))
  );
}
