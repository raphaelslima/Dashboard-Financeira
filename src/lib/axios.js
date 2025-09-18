import axios from 'axios'

import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/localStorage'

export const api = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

api.interceptors.request.use((request) => {
  const acessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
  if (!acessToken) {
    return request
  }

  request.headers.Authorization = `Bearer ${acessToken}`
  return request
})
