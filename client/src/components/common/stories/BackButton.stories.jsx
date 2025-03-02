import '../../../index.css';
import React from 'react';
import BackButton from '../BackButton';

export default {
  title: 'Componentes/common/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'A simple back button to use with other components' } },
  },
  argTypes: {
    onclick: { control: 'function', description: 'The function to handle the click of the button' },
  },
};

const Template = (args) => <BackButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => {},
};
