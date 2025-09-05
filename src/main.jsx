import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import HomePage from './pages/home'
import LoginPage from './pages/loginPage'
import NotFoundPage from './pages/notFoundPage'
import SingupPage from './pages/singupPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SingupPage />} path="/singup" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
