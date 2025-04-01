import { useRef, useState, useEffect } from 'react';
import Card from '../../layout/Card';
import Input from '../../common/Input';
import BackButton from '../../common/BackButton';
import Dropdown from '../../common/Dropdown';
import { categories } from '../../../constants/educationCategories';
import { labelStyles, inputStyles } from '../../../constants/styles';
import { getKey, translateLabel, translateField } from '../../../utils/translateLabel';
import Modal from '../EditingPanel/Modal';
import ErrorMessage from '../../common/ErrorMessage';
import AsyncSelect from 'react-select/async';
import Axios from 'axios';
import Button from '../../common/Button';
import {
  userFormat,
  userFormatError,
  removeAccents,
  checkSubmit,
  checkErrors,
  getErrors,
} from '../../../utils/userFormats';

const OCCUPATIONS_URL = 'http://localhost:3000/occupation/';

export default function AdminAddUserForm({ setJsonInput }) {
  const modal = useRef();
  const [cachedOptions, setCachedOptions] = useState([]);
  const [userData, setUserData] = useState(userFormat);
  const [error, setError] = useState(userFormatError);

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

  const handleChangeOccupations = (value) => {
    setError((prevError) => {
      return {
        ...prevError,
        occupations: false,
      };
    });
    setUserData((prevUserData) => ({
      ...prevUserData,
      occupations: value.map((currOccupation) => currOccupation.value),
    }));
  };

  const handleSubmit = () => {
    const errors = checkSubmit(userData);
    setError(errors);
    if (checkErrors(errors)) {
      return;
    }
    setJsonInput(JSON.stringify(userData));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await Axios.get(OCCUPATIONS_URL);
        const formattedOptions = response.data.map((occupation) => ({
          value: { name: occupation.name },
          label: occupation.name,
        }));
        setCachedOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  const loadOptions = (inputValue, callback) => {
    const normalizedInput = removeAccents(inputValue.toLowerCase());
    const filteredOptions = cachedOptions.filter((option) =>
      removeAccents(option.label.toLowerCase()).includes(normalizedInput)
    );
    callback(filteredOptions);
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

  return (
    <Card>
      <Modal
        ref={modal}
        handleClose={handleChangeLanguages}
        title="Añade un lenguaje"
        label="Lenguaje"
        inputId="language"
      />
      {checkErrors(error) && <ErrorMessage message={`Por favor ingresa tu ${getErrors(error)}`} />}
      <div className="grid grid-cols-2 gap-2 overflow-auto h-[37rem] pr-2 w-full">
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
          placeholder={'----Seleccione----'}
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
        <div className="min-h-44">
          <div className="flex justify-between">
            <p className={labelStyles}>Ocupaciones</p>
          </div>
          <AsyncSelect
            cacheOptions
            isMulti
            loadOptions={loadOptions}
            defaultOptions={cachedOptions}
            styles={{
              option: (provided) => ({
                ...provided,
                color: 'gray',
              }),
            }}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => handleChangeOccupations(e)}
          />
        </div>
      </div>
      <Button onClick={handleSubmit}>Confirmar</Button>
    </Card>
  );
}
