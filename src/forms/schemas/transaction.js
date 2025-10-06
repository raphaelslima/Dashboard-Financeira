import z from 'zod'

export const formTransactionSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O campo é obrigatório.',
  }),
  amount: z.number({
    required_error: 'O campo é obrigatório',
  }),
  date: z.date({
    required_error: 'O campo é obrigatório',
  }),
  type: z.enum(['EARNING', 'INVESTMENT', 'EXPENSE'], {
    message: 'O campo é obrigatório',
  }),
})

export const formEditTransaction = formTransactionSchema.extend({
  id: z.string().uuid(),
})
