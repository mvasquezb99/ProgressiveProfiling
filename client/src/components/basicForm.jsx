import { useState } from 'react';
import Dropdown from './Dropdown';
import { educationOptions } from '../constants/educationOptions';
import Input from './Input';
import Card from './Card';

export default function BasicForm() {
  const [enteredData, setEnteredData] = useState({
    name: '',
    email: '',
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
    <Card>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-2 text-[#090467]">Bienvenido a Magneto!</h2>
        <h3 className="text-l mb-2 text-[#090467]">
          Para empezar tu busqueda de empleo necesitamos algunos datos
        </h3>
        <div>
          <Input label="Nombre" handleChange={handleChange} inputId="name" />
          <Input label="Email" handleChange={handleChange} inputId="email" />

          <Dropdown
            options={educationOptions}
            label={'Nivel de educación'}
            placeholder="-- Seleccione un nivel de educación --"
            name="select"
            onChange={(e) => handleChange('education', e.target.value)}
            value={enteredData.education}
          />

          <div className="flex justify-end">
            <button className="mt-4 bg-[#090467] text-white shadow-md ">Continuar</button>
          </div>
        </div>
      </form>
    </Card>
  );
}
