import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const AuthConext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  singup: () => {},
  singOut: () => {},
})

export const useAuthContext = () => useContext(AuthConext)

const LOCAL_STORAGE_ACCESS_TOKEN = 'acessToken'
const LOCAL_STORAGE_REFRESH_TOKEN = 'refreshToken'

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN)
}

export const AuthConextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

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
        setTokens(apiResponse.tokens)
        setUser(apiResponse)
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
        setTokens(apiResponse.tokens)
        setUser(apiResponse)
        toast.success('Login realizado com sucesso.')
      },
      onError: () => {
        toast.error('Erro ao realizar login.')
      },
    })
  }

  const singOut = () => {
    setUser(null)
    setIsInitializing(null)
  }

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const acessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN)

        if (!acessToken && !refreshToken) return

        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${acessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        removeTokens()
        console.log(error)
        setUser(null)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])

  return (
    <AuthConext.Provider
      value={{
        user,
        isInitializing,
        login,
        singup,
        singOut,
      }}
    >
      {children}
    </AuthConext.Provider>
  )
}
