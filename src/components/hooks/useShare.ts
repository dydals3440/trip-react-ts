import { useCallback } from 'react'

// 아래처럼 간단한 인터페이스 제공
// const share = useShare();

interface shareProps {
  title: string
  description: string
  imageUrl: string
  buttonLabel: string
}

function useShare() {
  //  useCallback으로 매번 생기지 않게
  const handleShare = useCallback(
    ({ title, description, imageUrl, buttonLabel }: shareProps) => {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: buttonLabel,
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    },
    [],
  )

  return handleShare
}

export default useShare
