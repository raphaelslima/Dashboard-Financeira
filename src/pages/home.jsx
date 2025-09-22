import { Navigate } from 'react-router'

import Header from '@/components/Header'
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
    </>
  )
}

export default HomePage
