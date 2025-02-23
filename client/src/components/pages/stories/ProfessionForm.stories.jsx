import '../../../index.css';
import React from 'react';
import ProfessionForm from '../professionForm';

export default {
    title: 'Componentes/pages/ProfessionForm',
    component: ProfessionForm,
    parameters: {
        layout: 'centered',
        docs: { description: { component: 'The last form of the app that collects user professions ' } },
    },
    argTypes: {
        nextStep: { control: 'function', description: 'The function to handle the click of the next button and change the form display' },
    },
};


export const Primary = (args) => <ProfessionForm {...args} />;
Primary.args = {
    nextStep: () => {},
};