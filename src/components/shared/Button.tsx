import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ButtonColor,
  ButtonSize,
  buttonColorMap,
  buttonWeakMap,
  buttonSizeMap,
} from '@styles/button'
import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  // 버튼을 꽉 채울꺼니 말꺼니
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          // 가로를 꽉채웠는데 옆에가 비어있으면 이상함.
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined,
)

function ButtonGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Flex direction="column">
      {title != null ? (
        <>
          <Text typography="t6" bold>
            {title}
          </Text>
          <Spacing size={8} />
        </>
      ) : null}
      <Flex css={buttonGroupStyle}>{children}</Flex>
    </Flex>
  )
}

const buttonGroupStyle = css`
  // 버튼의 간격
  flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`

// 컴포넌트 확장방법
// 버튼은 BaseButton의 모든 타입을 사용할 수 있음.
const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

// <Button.ButtonGroup>
//   <Button></Button>
// </Button.ButtonGroup>

export default Button
