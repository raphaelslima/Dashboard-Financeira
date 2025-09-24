import { PlusIcon } from 'lucide-react'
import { Navigate } from 'react-router'

import Balance from '@/components/Balance'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import DateSeletor from '@/components/ui/DateSeletor'
import { useAuthContext } from '@/context/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center">
            <DateSeletor />
            <Button>
              {' '}
              <PlusIcon /> Nova Transação
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
      </div>
    </>
  )
}

export default HomePage
