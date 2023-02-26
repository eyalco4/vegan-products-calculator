import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Search from 'src/components/Search';

export default {
  title: 'components/Search',
  component: Search,
  argTypes: {
    products: { control: 'object' },
  },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: [
    {
      category: 'grains',
      products: [
        {
          //@ts-ignore
          product: {
            name: 'buckwheat',
            cookedFactor: 3.94,
            gr: {
              protein: 3.23,
              calories: 0.132,
              carbs: 0.715,
            },
          },
          selected: false,
          totalProtein: 0,
          totalCarbs: 0,
          totalCalories: 0,
          categoryIndex: 0,
          productIndex: 0,
        },
        {
          //@ts-ignore
          product: {
            name: 'bulgur',
            cookedFactor: 4,
            gr: {
              protein: 0.122,
              calories: 3.42,
              carbs: 0.759,
            },
            tbsp: {
              protein: 1.075,
              calories: 29.93,
              carbs: 6.625,
            },
          },
          selected: false,
          totalProtein: 0,
          totalCarbs: 0,
          totalCalories: 0,
          categoryIndex: 0,
          productIndex: 1,
        },
      ],
    },
  ],
};

/*

children?: React.ReactNode;
products: ICategoryListItem[];
onProductSelection: (categoryIndex: number, productIndex: number, selected: boolean) => void;*/
