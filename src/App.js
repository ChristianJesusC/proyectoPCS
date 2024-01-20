import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from "./components/Inicio.jsx"
import ShortPolling from "./components/shortPolling.jsx"
import Chat from "./components/shortPolling.jsx"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/short' element={<ShortPolling/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
