import { useState, useEffect, useContext } from 'react';
import { getLocation } from '../../../utils/calcLocation';
import { categories } from '../../../constants/educationCategories';
import { FormContext } from '../../../context/context';
import Dropdown from '../../common/Dropdown';
import Input from '../../common/Input';
import Card from '../../layout/Card';
import CardTitle from '../../common/CardTitle';
import Button from '../../common/Button';
import PropTypes from 'prop-types';
import ErrorMessage from '../../common/ErrorMessage';

export default function BasicForm({ nextStep }) {
  const [enteredData, setEnteredData] = useContext(FormContext);
  const [error, setError] = useState({ name: false, birthdate: false, category: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      name: enteredData.name.trim() === '',
      birthdate: enteredData.birthdate.trim() === '',
      category: enteredData.category.trim() === '',
    };

    setError(errors);

    if (!errors.name && !errors.birthdate && !errors.category) {
      nextStep(2);
    }
  };

  const handleChange = (id, value) => {
    if (error) {
      setError((prev) => ({ ...prev, [id]: false }));
    }
    setEnteredData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const getLocationData = async (position) => {
    const { city, country, postalCode, region } = await getLocation(
      position.coords.latitude,
      position.coords.longitude
    );

    setEnteredData((prevData) => {
      return {
        ...prevData,
        location: {
          city,
          country,
          postalCode,
          region,
        },
      };
    });
  };

  useEffect(() => {
    const calc = async () => {
      try {
        navigator.geolocation.getCurrentPosition(getLocationData);
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
          <Input
            label="Nombre"
            handleChange={handleChange}
            type="text"
            inputId="name"
            value={enteredData.name}
          />
          {error.name && <ErrorMessage message="!Por favor ingresa tu nombre!" />}
          <Input
            label="Fecha de Nacimiento"
            handleChange={handleChange}
            type="date"
            inputId="birthdate"
            value={enteredData.birthdate}
          />
          {error.birthdate && <ErrorMessage message="!Por favor ingresa tu fecha de nacimiento!" />}

          <Dropdown
            options={categories}
            label={'Categoría de ocupación'}
            placeholder="-- Seleccione una Categoría de ocupación --"
            name="select"
            onChange={(e) => handleChange('category', e.target.value)}
            value={enteredData.category}
          />
          {error.category && <ErrorMessage message="!Por favor ingresa tu categoría de ocupación!" />}

          <div className="flex w-full">
            <Button onClick={handleSubmit}>Continuar</Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

BasicForm.propTypes = {
  nextStep: PropTypes.func,
};
