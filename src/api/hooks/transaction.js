import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth'

import { transactionService } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const getCreateTransactionMutationQueryKey = () => ['createTransaction']

export const getUpdateTransactionMutationQueryKey = () => ['updateTransaction']

export const getTransactionsQueryKey = (userId, from, to) => {
  if (!from || !to) return ['transactions', userId]
  return ['transactions', userId, from, to]
}

export const useCreateTransaction = ({ from, to }) => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: getCreateTransactionMutationQueryKey(),
    mutationFn: (input) => transactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey(user.id, from, to),
      })
      toast.success('Transação criada com sucesso')
      queryClient.invalidateQueries(getTransactionsQueryKey(user.id, from, to))
    },
    onError: () => {
      toast.error('Transação inválida.')
    },
  })
}

export const useGetAllTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTransactionsQueryKey(user.id, from, to),
    queryFn: () => transactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: getUpdateTransactionMutationQueryKey(),
    mutationFn: (input) => transactionService.update(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey(user.id),
      })
      toast.success('Transação editada com sucesso')
      queryClient.invalidateQueries(getTransactionsQueryKey(user.id))
    },
    onError: () => {
      toast.error('Edição inválida.')
    },
  })
}
