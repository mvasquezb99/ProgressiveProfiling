import axios from 'axios';

export const getLocation = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const response = await axios.get(url);
    console.log(response.data);
    if (response.data && response.data.address) {
      const city = response.data.address.city || response.data.address.town || response.data.address.village;
      const country = response.data.address.country;
      const address = response.data.address.road;
      const postcode = response.data.address.postcode;
      const region = response.data.address.state || response.data.address.county;
      const countryCode = response.data.address.country_code;

      return { city, country, address, postcode, region, countryCode };
    } else {
      throw new Error('No se encontraron datos de ubicación');
    }
  } catch (error) {
    console.error('Error obteniendo la ubicación:', error);
    return null;
  }
};
