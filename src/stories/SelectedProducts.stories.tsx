import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectedProducts from 'src/components/SelectedProducts';
const styles = {
  transform: 'scale(1)',
  height: '50vh',
};
export default {
  title: 'components/SelectedProducts',
  component: SelectedProducts,
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],

  argTypes: {
    onTotalsUpdate: { control: 'function' },
    onProductRemoval: { control: 'function' },
    selectedProducts: { control: 'none' },
  },
} as ComponentMeta<typeof SelectedProducts>;

const Template: ComponentStory<typeof SelectedProducts> = (args) => <SelectedProducts {...args} />;

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
