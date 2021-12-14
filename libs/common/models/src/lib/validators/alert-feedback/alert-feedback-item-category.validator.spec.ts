import { AlertFeedbackQualification } from '@prisma/client';

import { mockAlertFeedbackFactory } from '../../generated/mock';
import { validateAlertFeedbackItemCategory } from './alert-feedback-item-category.validator';

describe('validateAlertFeedbackItemCategory', () => {
  it('should be invalid if item category is defined and qualification is null', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: null,
      itemCategoryId: '123',
    });

    expect(validateAlertFeedbackItemCategory(feedback)).toBe(false);
  });

  it('should be invalid if item category is defined and qualification is a non thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.nothingSuspect,
      itemCategoryId: '123',
    });

    expect(validateAlertFeedbackItemCategory(feedback)).toBe(false);
  });

  it('should be valid if item category is null and qualification is defined', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.nothingSuspect,
      itemCategoryId: null,
    });

    expect(validateAlertFeedbackItemCategory(feedback)).toBe(true);
  });

  it('should be valid if item category is defined and qualification is a thief qualification', () => {
    const feedback = mockAlertFeedbackFactory({
      qualification: AlertFeedbackQualification.stopped,
      itemCategoryId: '123',
    });

    expect(validateAlertFeedbackItemCategory(feedback)).toBe(true);
  });
});
