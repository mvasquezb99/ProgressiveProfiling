import '../../../index.css';
import React from 'react';
import ProgressTracker from '../ProgressTracker'

export default {
    title: 'Componentes/features/ProgressTracker',
    component: ProgressTracker,
    parameters: {
        layout: 'centered',
        docs: { description: { component: 'Track the progress of the user in the profiling' } },
    },
    argTypes: {
        step: {
            control: 'number',
            description: 'Identifies the step in which the user is.'
        }
    },
};

const Template = (args) => <ProgressTracker {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    step: 1 
};