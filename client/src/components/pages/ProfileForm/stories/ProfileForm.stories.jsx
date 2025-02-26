import '../../../../index.css';
import React from 'react';
import ProfileForm from '../ProfileForm';
import { FormContext } from '../../../../context/context';

export default {
  title: 'Componentes/pages/ProfileForm/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'The last form of the app that collects user professions ' } },
  },
  argTypes: {
    nextStep: {
      control: 'function',
      description: 'The function to handle the click of the next button and change the form display',
    },
  },
};

export const Primary = (args) => (
  <FormContext.Provider value={[{}, () => {}]}>
    <ProfileForm {...args} />;
  </FormContext.Provider>
);
Primary.args = {
  nextStep: () => {},
};
