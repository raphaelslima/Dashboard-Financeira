import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSingUp } from '@/api/hooks/user'
import { userServices } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/localStorage'

export const AuthConext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  singup: () => {},
  singOut: () => {},
})

export const useAuthContext = () => useContext(AuthConext)

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

  const singupmutation = useSingUp()

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

  const loginMutation = useLogin()

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

        const response = await userServices.me()
        setUser(response)
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
