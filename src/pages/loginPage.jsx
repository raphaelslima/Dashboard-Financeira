import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
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
import { AuthConext } from '@/context/auth'

const LoginPage = () => {
  const { user, login } = useContext(AuthConext)

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

  const handleSubmit = (data) => login(data)

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
