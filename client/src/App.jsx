import './App.css';

import BasicForm from './components/basicForm';
import ProfileFrom from './components/profileForm';

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      {/* <BasicForm /> */}
      <ProfileFrom></ProfileFrom>
    </div>
  );
}

export default App;
