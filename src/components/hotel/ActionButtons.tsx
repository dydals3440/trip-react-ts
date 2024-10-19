import { CopyToClipboard } from 'react-copy-to-clipboard'

import { css } from '@emotion/react'
import Flex from '@shared/Flex'

import useShare from '@components/hooks/useShare'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { Hotel } from '@models/hotel'

function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare()
  const { name, comment, mainImageUrl } = hotel

  return (
    <Flex css={containerStyles}>
      <Button
        label={'찜하기'}
        onClick={() => {}}
        iconUrl="https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png"
      />
      <Button
        label={'공유하기'}
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: '트립 보기',
          })
        }}
        iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png"
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          alert('링크 복사 완료!')
        }}
      >
        <Button
          label={'링크복사'}
          iconUrl="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/paste-clipboard-copy-64.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction={'column'} align={'center'} onClick={onClick}>
      <img src={iconUrl} alt={''} width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  // 아래있는 모든 요소에 flex 1 균등하게
  & * {
    flex: 1;
  }
`

export default ActionButtons
