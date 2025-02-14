import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import BasicForm from './components/basicForm';

function App() {

  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <BasicForm />
    </div>
  );
}

export default App;
