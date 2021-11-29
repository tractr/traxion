import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FeedbackEstimationsUiComponent } from './feedback-estimations-ui.component';

import { AngularCommonUiModule } from '@cali/angular-common-ui';
import { ItemCategory } from '@cali/common-models';

interface EstimationsFeedbackIO {
  itemsCategory: Pick<ItemCategory, 'id' | 'name'>[];
  itemCategorySelected: string | null;
  theftValue: number;
}

const baseProps = (
  override: Partial<EstimationsFeedbackIO> = {},
): EstimationsFeedbackIO => ({
  itemsCategory: [
    {
      id: '1',
      name: 'Maquillage',
    },
    {
      id: '2',
      name: 'Vins',
    },
    {
      id: '3',
      name: 'Bière',
    },
    {
      id: '4',
      name: 'Fruit',
    },
    {
      id: '5',
      name: 'Légume',
    },
  ],
  itemCategorySelected: null,
  theftValue: 0,
  ...override,
});

export default {
  title: 'Feedback/Estimations',
  component: FeedbackEstimationsUiComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AngularCommonUiModule,
        TranslateModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
} as Meta<FeedbackEstimationsUiComponent>;

const Template: Story<FeedbackEstimationsUiComponent> = (
  args: FeedbackEstimationsUiComponent,
) => ({
  component: FeedbackEstimationsUiComponent,
  props: args,
});

/** Storie alertFeedback estimation empty */
export const EstimationEmpty = Template.bind({});
EstimationEmpty.args = baseProps();

/** Storie alertFeedback estimation with category */
export const EstimationCategoryItem = Template.bind({});
EstimationCategoryItem.args = baseProps({
  itemCategorySelected: '2',
});

/** Storie alertFeedback estimation with value */
export const EstimationTheftValue = Template.bind({});
EstimationTheftValue.args = baseProps({
  theftValue: 25.68,
});

/** Storie alertFeedback estimation with category and value */
export const EstimationCategoryItemAndTheftValue = Template.bind({});
EstimationCategoryItemAndTheftValue.args = baseProps({
  itemCategorySelected: '2',
  theftValue: 25.68,
});
