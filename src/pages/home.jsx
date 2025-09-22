import { PlusIcon } from 'lucide-react'
import { Navigate } from 'react-router'

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
      <div className="flex items-center justify-between p-8">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <DateSeletor />
          <Button>
            {' '}
            <PlusIcon /> Nova Transação
          </Button>
        </div>
      </div>
    </>
  )
}

export default HomePage
