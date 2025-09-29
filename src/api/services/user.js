import { protectApi, publicApi } from '@/lib/axios'

export const userServices = {
  singup: async (data) => {
    const response = await publicApi.post('/users', data)
    return response.data
  },

  login: async (data) => {
    const response = await publicApi.post('/users/login', {
      email: data.email,
      password: data.password,
    })
    return response.data
  },

  me: async () => {
    const response = await protectApi.get('/users/me')
    return response.data
  },

  getBalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input.from)
    queryParams.set('to', input.to)
    const response = await protectApi.get(`/users/me/balance?${queryParams}`)
    return response.data
  },
}
