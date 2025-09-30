import { protectApi } from '@/lib/axios'

export const transactionService = {
  create: async (input) => {
    const res = await protectApi.post('/transactions/me', input)
    return res.data
  },
}
