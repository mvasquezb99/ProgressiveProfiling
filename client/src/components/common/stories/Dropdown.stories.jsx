import '../../../index.css';
import React from 'react';
import Dropdown from '../Dropdown';

export default {
  title: 'Componentes/common/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A custom select input that displays a list of options and allows the user to select one',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'The options of the dropdown as an array of objects with id and value',
    },
    label: { control: 'text', description: 'The label of the dropdown ' },
    placeholder: { control: 'text', description: 'The default selected value of the dropdown' },
    props: {
      control: 'object',
      description: 'Additional props passed to the select component',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
  ],
  label: 'Example dropdown',
  placeholder: 'Select an option',
};
