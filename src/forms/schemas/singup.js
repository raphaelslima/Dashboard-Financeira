import z from 'zod'

export const singupSchema = z
  .object({
    first_name: z.string().trim().min(1, {
      message: 'O nome é obrigatório.',
    }),
    last_name: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório.',
    }),
    email: z
      .string()
      .email({
        message: 'O email é inválido',
      })
      .trim()
      .min(1, {
        message: 'O nome é obrigatório.',
      }),
    password: z.string().trim().min(6, {
      message: 'A senha precisa ter no mínimo 6 caracteres.',
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: 'Confirmação de senha é obrigatória.',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Aceite os termos para efetuar o cadastro.',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation
    },
    {
      message: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    }
  )
