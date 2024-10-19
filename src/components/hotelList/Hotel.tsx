import { css } from '@emotion/react'

import { Hotel as IHotel } from '@models/hotel'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import addDelimiter from '@utils/addDelimiter'

function Hotel({ hotel }: { hotel: IHotel }) {
  return (
    <div>
      <ListRow
        contents={
          <Flex direction="column">
            <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
            <Spacing size={4} />
            <Text typography={'t7'} color={'gray600'}>
              {hotel.starRating}성급
            </Text>
          </Flex>
        }
        right={
          <Flex direction={'column'} align={'flex-end'}>
            {/* css를 직접 넣으면, 리렌더링이 계속됨. 새로운 스타일링을 만들어냄, 한번 만들어놓고 가져다 쓰는게 성능상 좋기에 아래 const로 따로 분류 */}
            <img src={hotel.mainImageUrl} alt={''} css={imageStyles} />
            <Spacing size={8} />
            <Text bold>{addDelimiter(hotel.price)}원</Text>
          </Flex>
        }
        style={containerStyles}
      />
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

export default Hotel
