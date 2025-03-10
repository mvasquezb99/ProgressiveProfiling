import './App.css';
import BasicForm from './components/pages/BasicForm';
import ProfileInstructions from './components/pages/ProfileInstructions';
import ProfileFrom from './components/pages/ProfileForm';
import ProfessionForm from './components/pages/ProfessionForm';
import { FormContext } from './context/context.jsx';
import { useState } from 'react';
import FinalPage from './components/pages/FinalPage/FinalPage.jsx';

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    birthdate: '',
    category: {name: ''},
    location: {
      city: '',
      country: '',
      postcode: '',
      region: '',
    },
    education: [],
    languages: [],
    occupations: [],
    work: [],
  });
  const handleNextStep = (step) => {
    setStep(step);
  };

  return (
    <FormContext.Provider value={[userData, setUserData]}>
      <main className="flex items-center justify-center h-screen w-screen ">
        {step === 1 && <BasicForm nextStep={handleNextStep} />}
        {step === 2 && <ProfileInstructions nextStep={handleNextStep} />}
        {step === 3 && <ProfileFrom nextStep={handleNextStep} />}
        {step === 4 && <ProfessionForm nextStep={handleNextStep} />}
        {step === 5 && <FinalPage />}
      </main>
    </FormContext.Provider>
  );
}

export default App;
