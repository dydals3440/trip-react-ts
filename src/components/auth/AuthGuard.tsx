import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/store/atom/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    // 유저의 정보가 변할 떄
    if (user == null) {
      // TODO:
      setUser(null)
    } else {
      // 로그인이 된 상태
      setUser({
        uid: user.uid,
        // 이메일은 있을 수 밖에없으므로 타입단언
        email: user.email as string,
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    }
    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
