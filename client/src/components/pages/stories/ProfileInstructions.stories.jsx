import '../../../index.css';
import React from 'react';
import ProfileInstructions from '../ProfileInstructions';

export default {
    title: 'Componentes/pages/ProfileInstructions',
    component: ProfileInstructions,
    parameters: {
        layout: 'centered',
        docs: { description: { component: 'Instructions previous to the ProfileForm component' } },
    },
    argTypes: {
        nextStep: { control: 'function', description: 'The function to handle the click of the next button and change the form display' },
    },
};


export const Primary = () => <ProfileInstructions />;