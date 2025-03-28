import '../../../../index.css';
import React from 'react';
import EditingPanel from '../EditingPanel';
import { FormContext } from '../../../../context/context';


export default {
  title: 'Componentes/pages/EditingPanel/EditingPanel',
  component: EditingPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A panel where the user can check their information and edit it if needed',
      },
    },
  },
  argTypes: {
    nextStep: {
      control: 'function',
      description: 'The function to handle the click of the next button and change the form display',
    },
  },
};

export const EditingPanelStory = (args) => (
  <FormContext.Provider
    value={[
      {
        name: 'Example Name',
        birthdate: '2003-04-30',
        category: { name: 'Ciencias e Investigación' },
        location: {
          city: 'Medellin',
          country: 'Colombia',
          postalCode: '040200',
          region: 'Antioquia',
        },
        education: { area: 'Fisica', degree: 'Preescolar', institution: 'MIT' },
        languages: 'Español,Portugués,Inglés,Alemán,Inglés,Alemán',
        occupations: [
          { name: 'Técnicos investigadores criminalísticos y judiciales' },
          { name: 'Físicos y astrónomos' },
          { name: 'Geólogos, geofísicos y geoquímicos' },
        ],
        work: { organization: 'Maggio, Effertz and Koepp', position: 'Chief Security Associate' },
      },
      () => {},
    ]}
  >
    <EditingPanel {...args} />
  </FormContext.Provider>
);

EditingPanel.args = {
  nextStep: () => {},
};
