import Card from '../../layout/Card';
import CardTitle from '../../common/CardTitle';
import Loading from '../../common/Loading';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { FormContext } from '../../../context/context';
export default function FinalPage() {
  const [userData, setUserData] = useContext(FormContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = userData;
        await axios.post('http://localhost:3000/users/save', requestData);
        window.open('https://www.magneto365.com/es', '_blank');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      {isLoading ? (
        <Loading message={'Generando tu perfil'} />
      ) : (
        <CardTitle title="Perfil creado con éxito" subtitle="Haz finalizado con el proceso" />
      )}
    </Card>
  );
}
