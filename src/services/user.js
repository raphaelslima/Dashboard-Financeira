import { publicApi } from '@/lib/axios'

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
}
