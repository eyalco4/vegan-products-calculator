import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Toggle from 'src/components/Toggle';

export default {
  title: 'components/Toggle',
  component: Toggle,
  argTypes: {
    disabled: { control: 'boolean' },
    isOn: { control: 'boolean' },
    setIsOn: { control: Function },
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  isOn: true,
  setIsOn: () => alert('setting is on clicked'),
};
