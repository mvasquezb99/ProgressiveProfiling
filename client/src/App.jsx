import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/pages/AdminPanel/AdminPanel.jsx';
import AppWrapper from './components/wrapper/AppWrapper.jsx';
import SurveyResponse from './components/pages/SurveyResponse/SurveyResponse.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/survey-response" element={<SurveyResponse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
