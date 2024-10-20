import { useEffect, useRef, useState } from 'react'
import { SerializedStyles } from '@emotion/react'
import { colors, Colors } from '@styles/colorPalette'

function ScrollProgressBar({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) {
  const [progress, setProgress] = useState(0)
  // requestAnimationFrame을 담아둘 ref를 생성
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      // 계산에 필요한 값을 가져옴
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      // 너무 많은 스크롤이 일어나기에, 중복된 값을 취소하는 cancleAnimation
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        // 콜백에서 상태값을 업데이트
        setProgress(scrollTop / height)
      })
    }

    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${progress})`,
        // 왼쪽부터 시작
        transformOrigin: 'left',
        backgroundColor: colors.blue980,
        height: 8,
      }}
    ></div>
  )
}

export default ScrollProgressBar
