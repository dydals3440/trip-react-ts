import { Navigate } from 'react-router-dom'

import { ReactNode } from 'react'
import useUser from '@components/hotel/hooks/auth/useUser'

function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}

export default PrivateRoute
