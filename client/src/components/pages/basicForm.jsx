import { useState, useEffect } from 'react';
import { getLocation } from '../../utils/calcLocation';
import { educationOptions } from '../../constants/educationOptions';

import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import Card from '../layout/Card';
import CardTitle from '../common/CardTitle';
import Button from '../common/Button';

export default function BasicForm({ nextStep }) {
  const [enteredData, setEnteredData] = useState({
    name: '',
    birthdate: '',
    education: '',
    city: '',
    country: '',
    address: '',
    postcode: '',
    region: '',
    countryCode: '',

    // TODO: Add Category
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(2);
    console.log(enteredData);
  };

  const handleChange = (id, value) => {
    setEnteredData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  useEffect(() => {
    const calc = async () => {
      try {
        const getCoords = () =>
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                });
              },
              (error) => reject(error)
            );
          });

        const { lat, lon } = await getCoords();
        const { city, country, address, postcode, region, countryCode } = await getLocation(lat, lon);

        setEnteredData((prevData) => {
          return {
            ...prevData,
            city,
            country,
            address,
            postcode,
            region,
            countryCode,
          };
        });
      } catch (error) {
        console.error('Error obteniendo la ubicación:', error);
      }
    };

    calc();
  }, []);

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
            <Button onClick={handleSubmit}>Continuar</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
