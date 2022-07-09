import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Homes from 'pages/Homes';
import { DefaultLayout } from 'components/atoms/KDLayout';
import Tests from 'pages/Tests';

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
      </DefaultLayout>
  </BrowserRouter>
  );
}

export default App;
