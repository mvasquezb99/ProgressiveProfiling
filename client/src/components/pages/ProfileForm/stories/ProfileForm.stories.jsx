import '../../../../index.css';
import React from 'react';
import ProfileForm from '../ProfileForm';

export default {
    title: 'Componentes/pages/ProfileForm/ProfileForm',
    component: ProfileForm,
    parameters: {
        layout: 'centered',
        docs: { description: { component: 'The last form of the app that collects user professions ' } },
    },
    argTypes: {
        nextStep: { control: 'function', description: 'The function to handle the click of the next button and change the form display' },
    },
};

export const Primary = (args) => <ProfileForm {...args} />;
Primary.args = {
    nextStep: () => {},
};