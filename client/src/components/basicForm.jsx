import { useState } from 'react';
import Dropdown from './Dropdown';
import { educationOptions } from '../constants/educationOptions';
import Input from './Input';
import Card from './Card';
import CardTitle from './CardTitle';
import Button from './Button';

export default function BasicForm() {
  const [enteredData, setEnteredData] = useState({
    name: '',
    birthdate: '',
    education: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(enteredData);
  };

  const handleChange = (id, value) => {
    setEnteredData({ ...enteredData, [id]: value });
  };

  return (
    <Card rem={25}>
      <form onSubmit={handleSubmit}>
        <CardTitle
          title={'Bienvenido a Magneto!'}
          subtitle={'Para empezar tu búsqueda de empleo necesitamos algunos datos'}
        />

        <div>
          <Input label="Nombre" handleChange={handleChange} type="text" inputId="name" />
          <Input label="Fecha de Nacimiento" handleChange={handleChange} type="date" inputId="birthdate" />

          <Dropdown
            options={educationOptions}
            label={'Nivel de educación'}
            placeholder="-- Seleccione un nivel de educación --"
            name="select"
            onChange={(e) => handleChange('education', e.target.value)}
            value={enteredData.education}
          />

          <div className="flex w-full">
            <Button>Continuar</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
