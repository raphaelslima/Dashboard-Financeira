import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { formTransactionSchema } from '../schemas/transaction'

export const useCreateTransactionForm = () => {
  return useForm({
    resolver: zodResolver(formTransactionSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })
}
