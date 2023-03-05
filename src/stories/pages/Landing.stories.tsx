import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Landing from 'src/pages/Landing';

export default {
  title: 'components/Landing',
  component: Landing,
  argTypes: {},
} as ComponentMeta<typeof Landing>;

const Template: ComponentStory<typeof Landing> = () => <Landing />;

export const Default = Template.bind({});
