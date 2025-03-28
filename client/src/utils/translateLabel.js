export const translateLabel = (location) => {
  switch (location) {
    case 'city':
      return 'Ciudad';
    case 'country':
      return 'País';
    case 'postalCode':
      return 'Código Postal';
    case 'region':
      return 'Región';
    case 'area':
      return 'Area (Educación)';
    case 'degree':
      return 'Diploma (Educación)';
    case 'institution':
      return 'Institución (Educación)';
    case 'organization':
      return 'Organización (Trabajo)';
    case 'position':
      return 'Posición (Trabajo)';
    default:
      return location;
  }
};

export const getKey = (key) => {
  return key === 'country' || key === 'region' || key === 'city' || key === 'postalCode'
    ? 'location'
    : key === 'degree' || key === 'institution' || key === 'area'
    ? 'education'
    : 'work';
};

export const translateField = (field) => {
  switch (field) {
    case 'name':
      return 'nombre';
    case 'birthdate':
      return 'fecha de nacimiento';
    case 'category':
      return 'categoría';
    case 'education':
      return 'educación';
    case 'work':
      return 'trabajo';
    case 'location':
      return 'ubicación';
    default:
      return field;
  }
};
