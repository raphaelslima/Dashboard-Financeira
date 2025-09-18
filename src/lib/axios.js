import axios from 'axios'

import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/constants/localStorage'

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

export const protectApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

protectApi.interceptors.request.use((request) => {
  const acessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
  if (!acessToken) {
    return request
  }

  request.headers.Authorization = `Bearer ${acessToken}`
  return request
})
