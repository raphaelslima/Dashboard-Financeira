import z from 'zod'

export const loginschema = z.object({
  email: z
    .string()
    .email({
      message: 'O email é inválido.',
    })
    .trim()
    .min(1, {
      message: 'O email é obrigatório.',
    }),
  password: z.string().min(6, {
    message: 'Senha precisa ter 6 caracteres',
  }),
})
