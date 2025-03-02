import '../../../../index.css';
import React from 'react';
import ProfileCard from '../ProfileCard';
import { profiles } from '../../../../constants/profiles';

export default {
  title: 'Componentes/pages/ProfileForm/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Card to display a sample user information' } },
  },
  argTypes: {
    profile: {
      control: 'Object',
      description: 'Sample user recovered from the database',
      table: {
        type: { summary: 'object' },
      },
    },
  },
};

const Template = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  profile: profiles[0],
};
