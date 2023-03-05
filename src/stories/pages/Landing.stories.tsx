import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import App from 'src/App';
import Landing from 'src/pages/Landing';

export default {
  title: 'components/Landing',
  component: Landing,
  argTypes: {},
} as ComponentMeta<typeof Landing>;

const Template: ComponentStory<typeof Landing> = () => (
  // @ts-ignore
  <App>
    <Landing setIsSignedIn={jest.fn()} />
  </App>
);

export const Default = Template.bind({});
