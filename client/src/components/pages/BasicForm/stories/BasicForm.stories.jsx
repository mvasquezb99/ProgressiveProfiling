import '../../../../index.css';
import React from 'react';
import BasicForm from '../BasicForm'

export default {
  title: 'Componentes/pages/BasicForm/BasicForm',
  component: BasicForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The first form of the app that collects user data such as name, birthdate, education and location',
      },
    },
  },
  argTypes: {
    nextStep: {
      control: 'function',
      description: 'The function to handle the click of the next button and change the form display',
    },
  },
};

export const BasicFormStory = (args) => <BasicForm {...args} />;

BasicFormStory.args = {
  nextStep: () => {},
};
