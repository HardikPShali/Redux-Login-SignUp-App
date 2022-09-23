import React from 'react';
import { Routes, Route } from 'react-router-dom'
import EditUser from './pages/EditUser';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editUser/:id" element={<EditUser />} />

      </Routes>
    </div>
  );
}

export default App;
