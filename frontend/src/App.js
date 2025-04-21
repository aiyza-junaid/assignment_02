import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Notes from './components/Notes';
import ResetPassword from './components/ResetPassword';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f4f7f8',
  fontFamily: 'Arial, sans-serif'
};

function App() {
  return (
    <div style={containerStyle}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
