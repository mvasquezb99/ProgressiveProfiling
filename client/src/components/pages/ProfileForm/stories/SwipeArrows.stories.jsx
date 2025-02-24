import '../../../../index.css';
import React from 'react';
import SwipeArrows from '../SwipeArrows'


export default {
    title: 'Componentes/pages/ProfileForm/SwipeArrows',
    component: SwipeArrows,
    parameters: {
        layout: 'centered',
        docs: { description: { component: 'Arrows to like or dislike a profile.' } },
    },
    argTypes: {
        handleLike: {
            control: 'function',
            description: 'The function to handle the like of a profile by pressing the button',
          },
        handleDislike: {
            control: 'function',
            description: 'The function to handle the dislike of a profile by pressing the button',
          },
    },
};

const Template = (args) => <SwipeArrows {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    handleLike: () => {}, 
    handleDislike: () => {}, 
};