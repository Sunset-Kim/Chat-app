import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import UItest from './pages/UItest/UItest';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uitest" element={<UItest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
