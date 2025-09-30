import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth'

import { transactionService } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const getCreateTransactionMutationQueryKey = () => ['createTransaction']

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
    },
    onError: () => {
      toast.error('Transação inválida.')
    },
  })
}
