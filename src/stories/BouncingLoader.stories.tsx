import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BouncingLoader from 'src/components/BouncingLoader';

export default {
  title: 'components/BouncingLoader',
  component: BouncingLoader,
  argTypes: {},
} as ComponentMeta<typeof BouncingLoader>;

const Template: ComponentStory<typeof BouncingLoader> = () => <BouncingLoader />;

export const Default = Template.bind({});
