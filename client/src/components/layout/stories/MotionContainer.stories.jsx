import '../../../index.css';
import React from 'react';
import MotionContainer from '../MotionContainer';
import ProfileCard from '../../features/ProfileCard'
import {profiles} from '../../../constants/profiles'

export default {
    title: 'Componentes/layout/MotionContainer',
    component: MotionContainer,
    parameters: {
        layout: 'centered',
        docs: { description: { component: 'Motion container that implements the swipe functionality' } },
    },
    argTypes: {
        children: { control: 'component', description: 'The content of the motion card' },
        handleLike: {
            control: 'function',
            description: 'The function to handle the like of a profile by swiping',
        },
        handleDislike: {
            control: 'function',
            description: 'The function to handle the dislike of a profile by swiping',
        },
    },
};

const Template = (args) => <MotionContainer {...args} />;
export const restricted = Template.bind({});
restricted.args = {
    children: <ProfileCard profile={profiles[0]}/>,
    handleLike: () => { },
    handleDislike: () => { },
};

