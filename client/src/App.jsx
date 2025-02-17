import './App.css';
import BasicForm from './components/BasicForm';
import ProfileFrom from './components/profileForm';
import ProfessionForm from './components/ProfessionForm';
import { Route, Routes } from 'react-router';
import ProfileInstructions from './components/ProfileInstructions';

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <Routes>
        <Route path="/register" element={<BasicForm />}></Route>
        <Route path="/instructions" element={<ProfileInstructions />}></Route>
        <Route path="/profiles" element={<ProfileFrom />}></Route>
        <Route path="/occupations" element={<ProfessionForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
