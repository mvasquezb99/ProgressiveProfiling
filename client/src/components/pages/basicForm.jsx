import { useState } from 'react';
import Dropdown from '../common/Dropdown';
import { educationOptions } from '../../constants/educationOptions';
import Input from '../common/Input';
import Card from '../layout/Card';
import CardTitle from '../common/CardTitle';
import Button from '../common/Button';

export default function BasicForm() {
  const [enteredData, setEnteredData] = useState({
    name: '',
    birthdate: '',
    education: '',
    // TODO: Add Category
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
            <Button to={"/instructions"}>Continuar</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
