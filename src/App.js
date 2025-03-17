import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start/StartPage';
import TestPage from './pages/test/TestPage';
import ResultPage from './pages/result/ResultPage.jsx';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="/test/:name" element={<TestPage />} />
        <Route path="/result/:name" element={<ResultPage />} />
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
