import './App.css';
import BasicForm from './components/pages/BasicForm';
import ProfileInstructions from './components/pages/ProfileInstructions';
import ProfileFrom from './components/pages/ProfileForm';
import ProfessionForm from './components/pages/ProfessionForm';
import { FormContext } from './context/context.jsx';
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [enteredData, setEnteredData] = useState({
    name: '',
    birthdate: '',
    occupationCategory: '',
    city: '',
    country: '',
    address: '',
    postcode: '',
    region: '',
    countryCode: '',
  });
  const handleNextStep = (step) => {
    setStep(step);
  };

  return (
    <FormContext.Provider value={[enteredData, setEnteredData]}>
      <div className="flex items-center justify-center h-screen w-screen ">
        {step === 1 && <BasicForm nextStep={handleNextStep} />}
        {step === 2 && <ProfileInstructions nextStep={handleNextStep} />}
        {step === 3 && <ProfileFrom nextStep={handleNextStep} />}
        {step === 4 && <ProfessionForm nextStep={handleNextStep} />}
      </div>
    </FormContext.Provider>
  );
}

export default App;
