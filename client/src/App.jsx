import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/pages/AdminPanel/AdminPanel.jsx';
import AppWrapper from './components/wrapper/AppWrapper.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
