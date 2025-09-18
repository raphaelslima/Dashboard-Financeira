import axios from 'axios'

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/localStorage'

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

protectApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config.request
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)
    if (!refreshToken) return Promise.reject(error)

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/auth/refresh')
    ) {
      request._retry = true
      const response = await protectApi.post('/auth/refresh', {
        refreshToken,
      })
      try {
        const newAcessToken = response.data.acessToken
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, newAcessToken)
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, newRefreshToken)
        request.headers.Authorization = `Bearer ${newAcessToken}`
        return protectApi(request)
      } catch (refreshError) {
        console.error(refreshError)
      }
    }
  }
)
