import { useMutation, useQuery } from '@tanstack/react-query'

import { userServices } from '@/api/services/user'
import { useAuthContext } from '@/context/auth'

export const getUserBalanceQueryKey = (userId, from, to) => {
  if (!from || !to) return ['balance', userId]
  return ['balance', userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext()

  return useQuery({
    queryKey: getUserBalanceQueryKey(user.id, from, to),
    queryFn: () => {
      return userServices.getBalance({ from, to })
    },
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

export const getSingUpQueryKey = () => ['singup']

export const useSingUp = () => {
  return useMutation({
    mutationKey: getSingUpQueryKey(),
    mutationFn: async (data) => {
      const responseApi = await userServices.singup(data)
      return responseApi
    },
  })
}

export const getLoginQueryKey = () => ['login']

export const useLogin = () => {
  return useMutation({
    mutationKey: getLoginQueryKey(),
    mutationFn: async (data) => {
      const response = await userServices.login(data)
      return response
    },
  })
}
