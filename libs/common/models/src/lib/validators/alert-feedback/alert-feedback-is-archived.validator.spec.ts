import { AlertFeedbackQualification, AlertFeedbackType } from '../../generated';
import { mockAlertFeedbackFactory } from '../../generated/mock';
import { validateAlertFeedbackIsArchived } from './alert-feedback-is-archived.validator';

describe('validateAlertFeedbackIsArchived', () => {
  it('should fail if isArchived is true and type is null', () => {
    const feedback = mockAlertFeedbackFactory({
      type: null,
      qualification: AlertFeedbackQualification.stopped,
      isPertinent: true,
      itemCategoryId: '123',
      thiefValue: 10,
      isArchived: true,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(false);
  });

  it('should fail if isArchived is true and qualification is null', () => {
    const feedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.thief,
      qualification: null,
      isPertinent: true,
      itemCategoryId: '123',
      thiefValue: 10,
      isArchived: true,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(false);
  });

  it('should fail if isArchived is true and itemCategory is null for a thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.thief,
      qualification: AlertFeedbackQualification.stopped,
      isPertinent: true,
      itemCategoryId: null,
      thiefValue: 10,
      isArchived: true,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(false);
  });

  it('should fail if isArchived is true and thiefValue is null for a thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.thief,
      qualification: AlertFeedbackQualification.stopped,
      isPertinent: true,
      itemCategoryId: '123',
      thiefValue: null,
      isArchived: true,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(false);
  });

  it('should pass if isArchived is true and everything is define in the feedback', () => {
    const feedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.thief,
      qualification: AlertFeedbackQualification.stopped,
      isPertinent: true,
      itemCategoryId: '123',
      thiefValue: 100,
      isArchived: true,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(true);
  });

  it('should pass if isArchived is true and everything is define in the feedback except itemCategory or thiefValue for a non thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      type: AlertFeedbackType.falseAlert,
      qualification: AlertFeedbackQualification.nothingSuspect,
      isPertinent: true,
      itemCategoryId: null,
      thiefValue: null,
      isArchived: true,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(true);
  });

  it('should pass if isArchived is false', () => {
    const feedback = mockAlertFeedbackFactory({
      type: null,
      qualification: null,
      isPertinent: true,
      itemCategoryId: null,
      thiefValue: null,
      isArchived: false,
    });

    expect(validateAlertFeedbackIsArchived(feedback)).toBe(true);
  });
});
