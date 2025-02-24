import '../../../index.css';
import React from 'react';
import Card from '../Card';

export default {
  title: 'Componentes/layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'A card to use as app/forms background' } },
  },
  argTypes: {
    rem: { control: 'number', description: 'optional: Set the with of the card in rem' },
    children: { control: 'component', description: 'The content of the card' },
    step: { control: 'number', description: 'Specify which form to display' },
  },
};

const Template = (args) => <Card {...args} />;

export const Step_1 = Template.bind({});
Step_1.args = {
  children: <h1>Contenido - Step 1</h1>,
  step: 1,
};

export const Step_2 = Template.bind({});
Step_2.args = {
  rem: 30,
  children: <h1>Contenido - Step 2</h1>,
  step: 2,
};

export const Step_3 = Template.bind({});
Step_3.args = {
  rem: 40,
  children: <h1>Contenido - Step 3</h1>,
  step: 3,
};
