import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Totals from 'src/components/Totals';
import { wrapper } from 'src/stories/decorators';

export default {
  title: 'components/Totals',
  component: Totals,
  decorators: wrapper,
  argTypes: {
    totalProtein: { control: 'text' },
    totalCarbs: { control: 'text' },
    totalCalories: { control: 'text' },
  },
} as ComponentMeta<typeof Totals>;

const Template: ComponentStory<typeof Totals> = (args) => <Totals {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalProtein: 140,
  totalCarbs: 860,
  totalCalories: 2300,
};
