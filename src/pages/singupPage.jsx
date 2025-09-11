import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

const singupSchema = z.object({
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

const SingupPage = () => {
  const [user, setUser] = useState(null)
  const singupmutation = useMutation({
    mutationKey: ['singup'],
    mutationFn: async (data) => {
      const responseApi = await api.post('/users', data)
      return responseApi.data
    },
  })
  const form = useForm({
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

  const handleSubmit = (data) => {
    singupmutation.mutate(data, {
      onSuccess: (apiResponse) => {
        const acessToken = apiResponse.tokens.accessToken
        const refreshToken = apiResponse.tokens.refreshToken
        setUser(apiResponse)
        localStorage.setItem('acessToken', acessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Conta criada com sucesso.')
      },
      onError: () => {
        toast.error('Erro ao criar a conta.')
      },
    })
  }

  if (user) {
    return <h1>{user.first_name}</h1>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-3 py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu primeiro nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="peer-disabled: !mt-0 text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                        Accept terms and conditions
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to={'/login'}>Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SingupPage
