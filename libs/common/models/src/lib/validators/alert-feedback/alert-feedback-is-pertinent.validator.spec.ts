import { AlertFeedbackQualification } from '../../generated';
import { mockAlertFeedbackFactory } from '../../generated/mock';
import { validateAlertFeedbackIsPertinent } from './alert-feedback-is-pertinent.validator';

describe('validateAlertFeedbackIsPertinent', () => {
  it('should be invalid if qualification is not "nothingSuspect" and isPertinent is false', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.stopped,
      isPertinent: false,
    });

    expect(validateAlertFeedbackIsPertinent(feedback)).toBe(false);
  });
  it('should be valid if and isPertinent is true', () => {
    Object.values(AlertFeedbackQualification).forEach((qualification) => {
      const feedback = mockAlertFeedbackFactory({
        qualification,
        isPertinent: true,
      });

      expect(validateAlertFeedbackIsPertinent(feedback)).toBe(true);
    });
  });
});
