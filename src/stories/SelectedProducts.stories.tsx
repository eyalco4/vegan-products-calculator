import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { wrapper } from 'src/stories/decorators';
import SelectedProductsList from 'src/components/SelectedProductsList';

export default {
  title: 'components/SelectedProductsList',
  component: SelectedProductsList,
  decorators: wrapper,

  argTypes: {
    onTotalsUpdate: { control: 'function' },
    onProductRemoval: { control: 'function' },
    selectedProducts: { control: 'none' },
  },
} as ComponentMeta<typeof SelectedProductsList>;

const Template: ComponentStory<typeof SelectedProductsList> = (args) => (
  <SelectedProductsList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedProducts: [
    {
      //@ts-ignore
      product: {
        name: 'soy sauce',
        gr: { protein: 0.125, calories: 3.75, carbs: 0.786 },
      },
      selected: true,
      totalProtein: 9,
      totalCarbs: 9.8,
      totalCalories: 84,
      categoryIndex: 2,
      productIndex: 1,
    },
    {
      //@ts-ignore
      product: { name: 'pumpkin', gr: { protein: 0.125, calories: 3.75, carbs: 0.786 } },
      selected: true,
      totalProtein: 1,
      totalCarbs: 6.5,
      totalCalories: 26,
      categoryIndex: 7,
      productIndex: 4,
    },
    {
      //@ts-ignore
      product: {
        name: 'pasta',
        cookedFactor: 2.8,
        gr: { protein: 0.125, calories: 3.75, carbs: 0.786 },
      },
      selected: true,
      totalProtein: 12.5,
      totalCarbs: 78.6,
      totalCalories: 375,
      categoryIndex: 8,
      productIndex: 0,
    },
  ],
  onTotalsUpdate: () => true,
  onProductRemoval: () => true,
};
