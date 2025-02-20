import { useState } from 'react';
import { professions } from '../../constants/professions';

import CardTitle from '../common/CardTitle';
import Card from '../layout/Card';
import ProfessionItem from '../features/ProfessionItem';
import Button from '../common/Button';

export default function ProfessionForm() {
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

  return (
    <Card rem={30} step={3}>
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
