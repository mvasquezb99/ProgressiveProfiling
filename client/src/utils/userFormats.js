import { translateField } from './translateLabel';
const userFormat = {
  name: '',
  birthdate: '',
  email: '',
  category: { name: '' },
  location: {
    city: '',
    country: '',
    postalCode: '',
    region: '',
  },
  education: { area: '', degree: '', institution: '' },
  languages: 'Español',
  occupations: [],
  work: { organization: '', position: '' },
};

const userFormatError = {
  name: false,
  birthdate: false,
  email: false,
  category: false,
  location: false,
  education: false,
  languages: false,
  occupations: false,
  work: false,
};

const checkSubmit = (userData) => {
  return {
    name: userData.name.trim() === '',
    email: userData.email.trim() === '' || !userData.email.includes('@'),
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
};

const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const checkErrors = (errors) => {
  return errors.name ||
    errors.email ||
    errors.birthdate ||
    errors.category ||
    errors.location ||
    errors.education ||
    errors.occupations ||
    errors.work
    ? true
    : false;
};

const getErrors = (errors) => {
  let errorFields = '';
  Object.keys(errors).forEach((key) => {
    if (errors[key]) {
      errorFields += `${translateField(key)}, `;
    }
  });

  return errorFields.substring(0, errorFields.length - 2);
};

export { userFormat, userFormatError, checkSubmit, removeAccents, checkErrors, getErrors };
