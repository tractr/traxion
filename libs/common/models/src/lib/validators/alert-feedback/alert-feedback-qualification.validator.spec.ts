import { AlertFeedbackQualification, AlertFeedbackType } from '@prisma/client';

import { mockAlertFeedbackFactory } from '../../generated/mock';
import { validateAlertFeedbackQualification } from './alert-feedback-qualification.validator';

describe('validateAlertFeedbackQualification', () => {
  it('should be valid if type and qualification are null', () => {
    const alertFeedback = mockAlertFeedbackFactory({
      type: null,
      qualification: null,
    });

    expect(validateAlertFeedbackQualification(alertFeedback)).toBe(true);
  });

  it('should be valid if type is defined and qualification is null', () => {
    const alertFeedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.falseAlert,
      qualification: null,
    });

    expect(validateAlertFeedbackQualification(alertFeedback)).toBe(true);
  });

  it('should be invalid if type is null and qualification is defined', () => {
    const alertFeedback = mockAlertFeedbackFactory({
      type: null,
      qualification: AlertFeedbackQualification.dissuasion,
    });

    expect(validateAlertFeedbackQualification(alertFeedback)).toBe(false);
  });

  it('should be valid if type and qualification are defined and of the same category', () => {
    const alertFeedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.thief,
      qualification: AlertFeedbackQualification.stopped,
    });

    expect(validateAlertFeedbackQualification(alertFeedback)).toBe(true);
  });

  it('should be invalid if type and qualification are defined and not of the same category', () => {
    const alertFeedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.thief,
      qualification: AlertFeedbackQualification.nothingSuspect,
    });

    expect(validateAlertFeedbackQualification(alertFeedback)).toBe(false);
  });
});
