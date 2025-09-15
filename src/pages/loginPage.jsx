import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

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

const LoginPage = () => {
  const [user, setUser] = useState(null)
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      const response = await api.post('/users/login', {
        email: data.email,
        password: data.password,
      })
      return response.data
    },
  })

  const loginschema = z.object({
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

  const form = useForm({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        const acessToken = localStorage.getItem('acessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        if (!acessToken && !refreshToken) return

        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${acessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('acessToken')
        localStorage.removeItem('refreshToken')
        console.log(error)
      }
    }

    init()
  })

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (apiResponse) => {
        const acessToken = apiResponse.tokens.accessToken
        const refreshToken = apiResponse.tokens.refreshToken
        setUser(apiResponse)
        localStorage.setItem('acessToken', acessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Login realizado com sucesso.')
      },
      onError: () => {
        toast.error('Erro ao realizar login.')
      },
    })
  }

  if (user) {
    return <h1>{user.first_name}</h1>
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Faça login</CardTitle>
              <CardDescription>
                Insira seus dados para entrar na sua conta!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full">Entrar</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to={'/singup'}>Cadastre clicando aqui</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
