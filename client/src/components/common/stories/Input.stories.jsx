import '../../../index.css';
import React from 'react';
import Input from '../Input';

export default {
  title: 'Componentes/common/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'A simple input to use with other components' } },
  },
  argTypes: {
    label: { control: 'text', description: 'The label of the input' },
    type: { control: 'text', description: 'Specify the type of the input' },
    handleChange: {
      control: 'function',
      description: 'The function to handle the change of the input (change states values)',
    },
    inputId: { control: 'text', description: 'Specify which state to change' },
  },
};

const Template = (args) => <Input {...args} />;

export const Text_Input = Template.bind({});
Text_Input.args = {
  label: 'Example input',
  type: 'text',
  handleChange: () => {},
  inputId: 'text',
};

export const Date_Input = Template.bind({});
Date_Input.args = {
  label: 'Example input',
  type: 'date',
  handleChange: () => {},
  inputId: 'date',
};

export const Number_Input = Template.bind({});
Number_Input.args = {
  label: 'Example input',
  type: 'number',
  handleChange: () => {},
  inputId: 'number',
};
