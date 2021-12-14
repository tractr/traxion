import { AlertFeedbackQualification } from '@prisma/client';

import { mockAlertFeedbackFactory } from '../../generated/mock';
import { validateAlertFeedbackThiefValue } from './alert-feedback-thief-value.validator';

describe('validateAlertFeedbackThiefValue', () => {
  it('should be invalid if thief value is defined and qualification is null', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: null,
      thiefValue: 123,
    });

    expect(validateAlertFeedbackThiefValue(feedback)).toBe(false);
  });

  it('should be invalid if thief value is defined and qualification is a non thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.nothingSuspect,
      thiefValue: 123,
    });

    expect(validateAlertFeedbackThiefValue(feedback)).toBe(false);
  });

  it('should be valid if thief value is null and qualification is defined', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.nothingSuspect,
      thiefValue: null,
    });

    expect(validateAlertFeedbackThiefValue(feedback)).toBe(true);
  });

  it('should be valid if thief value is defined and qualification is a thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.stopped,
      thiefValue: 123,
    });

    expect(validateAlertFeedbackThiefValue(feedback)).toBe(true);
  });
});
