import { useEffect } from 'react'
// window 에서 카카오에 대한 타입을 모르므로
declare global {
  interface Window {
    Kakao: any
  }
}

function useLoadKakao() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    // 비동기로 다운받을 수 있게함.
    script.async = true

    // 헤더에다 붙여서 스크립트를 다운로드 받게
    document.head.appendChild(script)

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
      }
    }
  }, [])
}

export default useLoadKakao
