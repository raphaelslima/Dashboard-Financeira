import queryString from 'query-string'

import { protectApi } from '@/lib/axios'

export const transactionService = {
  create: async (input) => {
    const res = await protectApi.post('/transactions/me', input)
    return res.data
  },
  getAll: async (input) => {
    const query = queryString.stringify(
      { from: input.from, to: input.to },
      { skipNull: true, skipEmptyString: true }
    )
    const res = await protectApi.get(`/transactions/me?${query}`)
    return res.data
  },
  update: async (transaction) => {
    const res = await protectApi.patch(`/transactions/me/${transaction.id}`, {
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    })
    return res
  },
}
