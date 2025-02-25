import '../../../index.css';
import React from 'react';
import ErrorMessage from '../ErrorMessage';

export default {
  title: 'Componentes/common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: 'Display error message to the user in case some information is missing' },
    },
  },
  argTypes: {
    message: { control: 'text', description: 'The error message to display' },
  },
};

const Template = (args) => <ErrorMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  message: 'Ingrese la información requerida',
};
