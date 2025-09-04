import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import App from './App.jsx'
import HomePage from './pages/home'
import NotFoundPage from './pages/notFoundPage'
import SingupPage from './pages/singupPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<App />} path="/login" />
        <Route element={<SingupPage />} path="/singup" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
