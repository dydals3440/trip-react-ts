import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import React, { MouseEvent } from 'react'

import { colors } from '@styles/colorPalette'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck withCircle checked={checked} />
      <Text bold>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) {
  return (
    <Flex as="li">
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        // 새창으로 열음
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
    >
      {withCircle ? (
        <g>
          <path
            fill={checked ? colors.blue : colors.gray}
            d="M24,46C11.9,46,2,36.1,2,24S11.9,2,24,2s22,9.9,22,22S36.1,46,24,46z M24,4C13,4,4,13,4,24c0,11,9,20,20,20   c11,0,20-9,20-20C44,13,35,4,24,4z"
          />
        </g>
      ) : null}
      <g>
        <polygon
          fill={checked ? colors.blue : colors.gray}
          points="20,34.1 11.3,25.4 12.7,23.9 20,31.2 35.3,15.9 36.7,17.4  "
        />
      </g>
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

export default Agreement

/**
 * <Agreement>
 *   <Agreement.Title>약관에 모두 동의</Agreement.Title>
 *   <Agreement.Description> 약관1 </Agreement.Description>
 *   <Agreement.Description> 약관2 </Agreement.Description>
 * </Agreement>
 */
