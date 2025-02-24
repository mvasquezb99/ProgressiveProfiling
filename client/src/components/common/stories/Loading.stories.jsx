import '../../../index.css';
import React from 'react';
import Loading from '../Loading';

export default {
  title: 'Componentes/common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Visual loading component' } },
  },
};

const Template = () => <Loading/>;

export const Primary = Template.bind({});
