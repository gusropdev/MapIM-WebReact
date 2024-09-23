import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FloorMap from './components/FloorMap'; // Corrigido o caminho

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<FloorMap initialFloor="1-andar" />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;
