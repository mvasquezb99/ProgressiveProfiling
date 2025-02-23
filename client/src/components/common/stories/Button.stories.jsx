import '../../../index.css';
import React from 'react';
import Button from '../Button';

export default {
  title: 'Componentes/common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'A simple button to use with other components' } },
  },
  argTypes: {
    children: { control: 'text', description: 'Text inside the button' },
    props: {
      control: 'object',
      description: 'Additional props passed to the component',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Continuar',
};
