import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const AuthConext = createContext({
  user: null,
  login: () => {},
  singup: () => {},
})

export const useAuthContext = () => useContext(AuthConext)

export const AuthConextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const singupmutation = useMutation({
    mutationKey: ['singup'],
    mutationFn: async (data) => {
      const responseApi = await api.post('/users', data)
      return responseApi.data
    },
  })

  const singup = (data) => {
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

  const login = (data) => {
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
        console.log(error)
      }
    }
    init()
  }, [])

  return (
    <AuthConext.Provider value={{ user: user, login: login, singup: singup }}>
      {children}
    </AuthConext.Provider>
  )
}
