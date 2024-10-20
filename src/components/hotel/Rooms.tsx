import qs from 'qs'
import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import Text from '@shared/Text'

import useRooms from '@components/hotel/hooks/useRooms'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import addDelimiter from '@utils/addDelimiter'
import useUser from '@components/hotel/hooks/auth/useUser'
import { useAlertContext } from '@contexts/AlertContext'
import { useNavigate } from 'react-router-dom'
import withSuspense from '@shared/hocs/withSuspense'

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })
  // 로그인 여부
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()

  return (
    <Container>
      <Header justify={'space-between'} align={'center'}>
        <Text bold typography={'t4'}>
          객실정보
        </Text>
        <Text typography={'t6'} color={'gray400'}>
          1박, 세금포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const 마감임박인가 = room.availableCount === 1
          const 매진인가 = room.availableCount === 0

          // 쿼리스트링 제작
          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            { addQueryPrefix: true },
          )

          console.log(params)

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}의 객실 이미지`}
                  css={imageStyles}
                />
              }
              right={
                <Button
                  size={'medium'}
                  disabled={매진인가}
                  onClick={() => {
                    if (user == null) {
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => {
                          navigate('/signin')
                        },
                      })
                      return
                    }
                    navigate(`/schedule${params}`)
                  }}
                >
                  {매진인가 === true ? '매진' : '선택'}
                </Button>
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {마감임박인가 === true ? (
                        <>
                          <Spacing size={6} direction={'horizontal'} />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

// 동적으로 뭔가 변경되지 않으므로 css를 활용해도됨
const Container = styled.div`
  margin: 40px 0;
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default withSuspense(Rooms, { fallback: <div>룸 불러오는중....</div> })
