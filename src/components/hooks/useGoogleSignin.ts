import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { FirebaseError } from 'firebase/app'
import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'

function useGoogleSignin() {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      // 이미 가입된 유저라면, 새롭게 가입 안시키도록
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      if (userSnapshot.exists()) {
        alert('이미 가입한 이메일입니다.')
        navigate('/')
      } else {
        // 로그인 된 유저 저장
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }

        // user.uid로 문서의 id를 저장
        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          새로운유저,
        )

        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          return
        }
      }
      throw new Error('Fail to Signin')
    }
  }, [navigate])
  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return { signin, signout }
}

export default useGoogleSignin
