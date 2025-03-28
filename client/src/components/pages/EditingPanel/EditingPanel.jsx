import { useRef, useContext, useState } from 'react';
import { FormContext } from '../../../context/context';
import Card from '../../layout/Card';
import CardTitle from '../../common/CardTitle';
import Input from '../../common/Input';
import BackButton from '../../common/BackButton';
import Dropdown from '../../common/Dropdown';
import { categories } from '../../../constants/educationCategories';
import { labelStyles, inputStyles } from '../../../constants/styles';
import { getKey, translateLabel, translateField } from '../../../utils/translateLabel';
import Modal from './Modal';
import Button from '../../common/Button';
import ErrorMessage from '../../common/ErrorMessage';

export default function EditingPanel({ nextStep }) {
  const [userData, setUserData] = useContext(FormContext);
  const [error, setError] = useState({
    name: false,
    birthdate: false,
    category: false,
    location: false,
    education: false,
    languages: false,
    occupations: false,
    work: false,
  });
  const modal = useRef();
  const handleChangeInput = (inputId, value) => {
    setError((prevError) => {
      return {
        ...prevError,
        [inputId]: false,
      };
    });
    setUserData((prevUserData) => ({
      ...prevUserData,
      [inputId]: value,
    }));
  };
  const handleChangeObjects = (inputId, value) => {
    const key = getKey(inputId);
    setError((prevError) => {
      return {
        ...prevError,
        [key]: false,
      };
    });

    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: {
        ...prevUserData[key],
        [inputId]: value,
      },
    }));
  };
  const handleSubmit = () => {
    const errors = {
      name: userData.name.trim() === '',
      birthdate: userData.birthdate.trim() === '',
      category: userData.category.name.trim() === '',
      location:
        userData.location.city.trim() === '' ||
        userData.location.country.trim() === '' ||
        userData.location.postalCode.trim() === '' ||
        userData.location.region.trim() === ''
          ? true
          : false,
      education:
        userData.education.degree.trim() === '' ||
        userData.education.institution.trim() === '' ||
        userData.education.area.trim() === ''
          ? true
          : false,
      languages: userData.languages.trim() === '',
      occupations: userData.occupations.length === 0,
      work: userData.work.organization.trim() === '' || userData.work.position.trim() === '' ? true : false,
    };
    setError(errors);

    if (
      errors.name ||
      errors.birthdate ||
      errors.category ||
      errors.location ||
      errors.education ||
      errors.occupations ||
      errors.work
    ) {
      return;
    }

    nextStep(6);
  };

  const handleChangeLanguages = (language, operation) => {
    if (operation === 'sum') {
      setUserData((prevUserData) => ({
        ...prevUserData,
        languages: [...prevUserData.languages.split(','), language].join(','),
      }));
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        languages: prevUserData.languages
          .split(',')
          .filter((currLanguage) => currLanguage != language)
          .join(','),
      }));
    }
  };

  const removeOccupation = (occupation) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      occupations: prevUserData.occupations.filter((currOccupation) => currOccupation.name != occupation),
    }));
  };

  const getErrors = () => {
    let errorFields = '';

    Object.keys(error).forEach((key) => {
      if (error[key]) {
        errorFields += `${translateField(key)}, `;
      }
    });

    return errorFields.substring(0, errorFields.length - 2);
  };

  return (
    <Card step={3}>
      <Modal
        ref={modal}
        handleClose={handleChangeLanguages}
        title="Añade un lenguaje"
        label="Lenguaje"
        inputId="language"
      />
      <nav className="flex align-left w-full">
        <BackButton
          onClick={() => {
            nextStep(4);
          }}
        />
      </nav>
      <CardTitle
        title="Información personal"
        subtitle="Verifica si la información es correcta y editala si es necesario"
      />
      {(error.name ||
        error.birthdate ||
        error.category ||
        error.location ||
        error.education ||
        error.work) && <ErrorMessage message={`Por favor ingresa tu ${getErrors()}`} />}
      <div className="grid grid-cols-2 gap-2 overflow-auto h-[30rem] pr-2">
        <Input
          label="Nombre"
          type="text"
          inputId="name"
          value={userData.name}
          handleChange={handleChangeInput}
        />
        <Input
          label="Fecha de nacimiento"
          type="date"
          inputId="birthdate"
          value={userData.birthdate}
          handleChange={handleChangeInput}
        />
        <Dropdown
          options={categories}
          label="Categoría de ocupación"
          placeholder={userData.category.name}
          name="select"
          onChange={(e) => handleChangeInput('category', { name: e.target.value })}
          value={userData.category.name}
        />
        {Object.values(userData.location).map((value, index) => (
          <Input
            key={index}
            label={translateLabel(Object.keys(userData.location)[index])}
            type="text"
            inputId={Object.keys(userData.location)[index]}
            value={value}
            handleChange={handleChangeObjects}
          />
        ))}

        {Object.values(userData.education).map((value, index) => (
          <Input
            key={index}
            label={translateLabel(Object.keys(userData.education)[index])}
            type="text"
            inputId={Object.keys(userData.education)[index]}
            value={value}
            handleChange={handleChangeObjects}
          />
        ))}

        {Object.values(userData.work).map((value, index) => (
          <Input
            key={index}
            label={translateLabel(Object.keys(userData.work)[index])}
            type="text"
            inputId={Object.keys(userData.work)[index]}
            value={value}
            handleChange={handleChangeObjects}
          />
        ))}

        <div>
          <div className="flex justify-between">
            <p className={labelStyles}>Lenguajes</p>
            <i
              onClick={() => modal.current.showModal()}
              className="fa-solid fa-plus items-center hover:pointer hover:cursor-pointer text-green-700 hover:text-green-500"
            ></i>
          </div>
          <div className="max-h-30 overflow-y-auto pr-1">
            <ul className="grid grid-cols-2 gap-1 ">
              {userData.languages.split(',').map((language, index) => (
                <li key={index} className={`flex justify-between text-xs ${inputStyles} items-center`}>
                  <p key={index}>{language}</p>
                  {userData.languages.split(',').length > 1 && (
                    <i
                      onClick={() => handleChangeLanguages(language, 'sub')}
                      className="fa-solid fa-x  hover:cursor-pointer text-red-900 hover:text-red-500"
                    ></i>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className={labelStyles}>Ocupaciones</p>
          </div>
          <div className="max-h-30 overflow-y-auto pr-1">
            <ul className="grid grid-cols-2 gap-1">
              {userData.occupations.map((occupation, index) => (
                <li key={index} className={`flex justify-between text-xs ${inputStyles} items-center`}>
                  <p className="max-w-10 items-center" key={index}>
                    {occupation.name}
                  </p>
                  {userData.occupations.length > 1 && (
                    <i
                      onClick={() => removeOccupation(occupation.name)}
                      className="fa-solid fa-x  hover:cursor-pointer text-red-900 hover:text-red-500"
                    ></i>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit}>Confirmar</Button>
    </Card>
  );
}
