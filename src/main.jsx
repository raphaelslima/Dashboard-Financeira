import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Toaster } from './components/ui/sonner'
import { AuthConextProvider } from './context/auth'
import HomePage from './pages/home'
import LoginPage from './pages/loginPage'
import NotFoundPage from './pages/notFoundPage'
import SingupPage from './pages/singupPage'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthConextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SingupPage />} path="/singup" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </BrowserRouter>
      </AuthConextProvider>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
)
