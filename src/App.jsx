import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx'
import SuperheroDetail from './components/Detail.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/superhero/:id" element={<SuperheroDetail />} /> {/* Rute untuk detail superhero */}
      {/* Tambahkan rute lain sesuai kebutuhan */}
    </Routes>
    </BrowserRouter>
  );
};

export default App;
