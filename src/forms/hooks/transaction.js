import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateTransaction } from '@/api/hooks/transaction'

import {
  formEditTransaction,
  formTransactionSchema,
} from '../schemas/transaction'

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

export const useEditTransactionForm = ({ transaction }) => {
  const { mutateAsync } = useUpdateTransaction()
  const form = useForm({
    resolver: zodResolver(formEditTransaction),
    defaultValues: {
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: new Date(transaction.date),
      type: transaction.type,
    },
    shouldUnregister: true,
  })

  useEffect(() => {
    form.reset({
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: new Date(transaction.date),
      type: transaction.type,
    })
    form.setValue('id', transaction.id)
  }, [form, transaction])

  const onSubmit = async (data) => {
    await mutateAsync(data)
  }

  return { form, onSubmit }
}
