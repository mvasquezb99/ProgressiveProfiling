import '../../../../index.css';
import React from 'react';
import BasicForm from '../BasicForm';
import { FormContext } from '../../../../context/context';

export default {
  title: 'Componentes/pages/BasicForm/BasicForm',
  component: BasicForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The first form of the app that collects user data such as name, email, birthdate, education, and location',
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

export const BasicFormStory = (args) => (
  <FormContext.Provider value={[{}, () => {}]}>
    <BasicForm {...args} />
  </FormContext.Provider>
);

BasicFormStory.args = {
  nextStep: () => {},
};
