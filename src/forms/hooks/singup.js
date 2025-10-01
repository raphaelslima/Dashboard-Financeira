import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { singupSchema } from '../schemas/singup'

export const useSignupForm = () => {
  return useForm({
    resolver: zodResolver(singupSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })
}
