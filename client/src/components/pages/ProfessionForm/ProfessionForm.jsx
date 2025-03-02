import { useState } from 'react';
import { professions } from '../../../constants/professions';
import PropTypes from 'prop-types';
import CardTitle from '../../common/CardTitle';
import Card from '../../layout/Card';
import ProfessionItem from './ProfessionItem';
import Button from '../../common/Button';
import BackButton from '../../common/BackButton';

export default function ProfessionForm({ nextStep }) {
  const [selectedProfessions, setSelectedProfessions] = useState([]);

  const submit = () => {
    console.log(selectedProfessions);
  };

  const handleClick = (id) => {
    if (selectedProfessions.includes(id)) {
      setSelectedProfessions((prevData) => prevData.filter((profession) => profession !== id));
    } else {
      setSelectedProfessions((prevData) => [...prevData, id]);
    }
  };

  const resetProfessions = () => {
    setSelectedProfessions([]);
  };

  return (
    <Card rem={30} step={3}>
      <BackButton
        onClick={() => {
          nextStep(3);
          resetProfessions();
        }}
      />
      <CardTitle
        title="Un ultimo paso"
        subtitle="Selecciona al menos 3 ocupaciones que se relacionen contigo"
      />
      <div className="grid grid-cols-3 gap-2 overflow-auto h-[23rem] no-scrollbar pt-5">
        {professions.map((profession) => (
          <ProfessionItem
            key={profession.id}
            id={profession.id}
            profession={profession.value}
            handleClick={handleClick}
          />
        ))}
      </div>
      <Button onClick={submit}>Finalizar</Button>
    </Card>
  );
}

ProfessionForm.propTypes = {
  nextStep: PropTypes.func,
};
