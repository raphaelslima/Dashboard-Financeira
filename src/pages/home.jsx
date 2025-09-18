import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth'

const HomePage = () => {
  const { user, isInitializing, singOut } = useAuthContext()

  if (isInitializing) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h1>Olá {user.first_name}</h1>
      <Button onClick={singOut}>Sair</Button>
    </>
  )
}

export default HomePage
