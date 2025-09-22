import { publicApi } from '@/lib/axios'

export const userServices = {
  singup: async (data) => {
    const response = await publicApi.post('/users', data)
    return response.data
  },
}
