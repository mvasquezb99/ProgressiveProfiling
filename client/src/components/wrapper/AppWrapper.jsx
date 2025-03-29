import BasicForm from '../pages/BasicForm';
import ProfileInstructions from '../pages/ProfileInstructions';
import ProfileFrom from '../pages/ProfileForm';
import ProfessionForm from '../pages/ProfessionForm';
import EditingPanel from '../pages/EditingPanel';
import FinalPage from '../pages/FinalPage';
import { useState } from 'react';
import { FormContext } from '../../context/context';

export default function AppWrapper() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    birthdate: '',
    category: { name: '' },
    location: {
      city: '',
      country: '',
      postalCode: '',
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
        {step === 5 && <EditingPanel nextStep={handleNextStep} />}
        {step === 6 && <FinalPage />}
      </main>
    </FormContext.Provider>
  );
}
