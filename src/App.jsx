import React from 'react'
import {MainPage,LoginPage,NotFound404, RegisterPage,RestorePasswordPage,ForgotPasswordPage, ProfilePagePage} from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register'  element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path='/reset-password'  element={<RestorePasswordPage />} />
        <Route path='/profile'  element={<ProfilePagePage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
