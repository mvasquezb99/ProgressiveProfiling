import './App.css';
import BasicForm from './components/pages/basicForm';
import ProfileFrom from './components/pages/profileForm';
import ProfessionForm from './components/pages/ProfessionForm';
import ProfileInstructions from './components/pages/ProfileInstructions';

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
        <BasicForm />
        {/* <ProfileInstructions /> */}
        {/* <ProfileFrom /> */}
        {/* <ProfessionForm /> */}
    </div>
  );
}

export default App;
