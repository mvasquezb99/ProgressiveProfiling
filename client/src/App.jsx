import './App.css';
import BasicForm from './components/pages/BasicForm';
import ProfileFrom from './components/pages/profileForm';
import ProfessionForm from './components/pages/ProfessionForm';
import ProfileInstructions from './components/pages/ProfileInstructions';

import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      {step === 1 && <BasicForm nextStep={handleNextStep} />}
      {step === 2 && <ProfileInstructions nextStep={handleNextStep} />}
      {step === 3 && <ProfileFrom nextStep={handleNextStep} />}
      {step === 4 && <ProfessionForm nextStep={handleNextStep} />}
    </div>
  );
}

export default App;
