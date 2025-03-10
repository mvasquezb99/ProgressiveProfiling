import '../../../index.css';
import React from 'react';
import Loading from '../Loading';

export default {
  title: 'Componentes/common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Visual loading component' } },
    argTypes:{
      message: {
        control: 'text',
        description: 'Message to be displayed with the loading icon'
      }
    }
  },
};

const Template = () => <Loading/>;

export const Primary = Template.bind({});
Primary.args = {
  message : 'Buscando perfiles'
}
export const Secondary = Template.bind({});
Secondary.args = {
  message : 'Creando tu perfil'
}