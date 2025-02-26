import '../../../../index.css';
import React from 'react';
import ProfessionItem from '../ProfessionItem';

export default {
  title: 'Componentes/pages/ProfessionForm/ProfessionItem',
  component: ProfessionItem,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Each profession as a card that can be selected' } },
  },
  argTypes: {
    id: { control: 'number', description: 'Use to identify the profession that was selected or unselected' },
    profession: { control: 'component', description: 'The name of the profession' },
    handleClick: {
      control: 'function',
      description: 'The function to handle the click of the profession/card',
    },
  },
};

const Template = (args) => <ProfessionItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 1,
  profession: 'Profesión de ejemplo',
  handleClick: () => {},
};
