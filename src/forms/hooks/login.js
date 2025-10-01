import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginschema } from '../schemas/login'

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return { form }
}
