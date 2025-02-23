import '../../../index.css';
import React from 'react';
import CardTitle from '../CardTitle';

export default {
  title: 'Componentes/common/CardTitle',
  component: CardTitle,
  parameters: {
    layout: 'centered',
    docs: { description: { component: "A header title and subtitle to use with a card" } },
  },
  argTypes: {
    title: { control: 'text', description: 'Title of the card' },
    subtitle: { control: 'text', description: 'Optional: Subtitle of the card' },
  },
};

const Template = (args) => <CardTitle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Bienvenido a Magneto!',
  subtitle: 'Para empezar tu búsqueda de empleo necesitamos algunos datos',
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Un ultimo paso',
  subtitle: 'Selecciona al menos 3 ocupaciones que se relacionen contigo',
};
