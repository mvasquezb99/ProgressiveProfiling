import './App.css';
import BasicForm from './components/basicForm';
import ProfileFrom from './components/profileForm';
import ProfessionForm from './components/ProfessionForm';

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">

      {/* <BasicForm /> */}
      <ProfessionForm />
        {/* <ProfileFrom/> */}
     
    </div>
  );
}

export default App;
