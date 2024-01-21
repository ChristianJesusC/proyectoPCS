import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./components/Inicio.jsx"
import Chat from "./components/chat.jsx"
import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
