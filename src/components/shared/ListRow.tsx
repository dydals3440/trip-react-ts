import { css, SerializedStyles } from '@emotion/react'

import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  // Emotion에서 주는 style 타입
  style?: SerializedStyles
}

function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
  as = 'li',
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`
function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle?: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function ListRowSekeleton() {
  return (
    <Flex as={'li'} css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

// 함수도 객체이니 컴포넌트를 넣어줄 수 있음.
ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSekeleton

export default ListRow
