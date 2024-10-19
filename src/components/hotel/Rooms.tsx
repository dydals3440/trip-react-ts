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

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })

  console.log(data)
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
          const 마감임박인가 = room.avaliableCount === 1
          const 매진인가 = room.avaliableCount === 0

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
                <Button size={'medium'} disabled={매진인가}>
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

export default Rooms
