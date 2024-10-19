import { differenceInMilliseconds, parseISO } from 'date-fns'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Hotel } from '@models/hotel'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'

import addDelimiter from '@utils/addDelimiter'
import formatTime from '@utils/formatTime'

function HotelItem({ hotel }: { hotel: Hotel }) {
  const [remainedTime, setRemainedTime] = useState(0)

  // 최초 진입시, 첫 렌더링 될 떄 캐치를 해서, Interval을 걸어줌.
  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return
    }

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      if (남은초 < 0) {
        clearInterval(timer)
        return
      }

      setRemainedTime(남은초)
    }, 1_000)

    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const tagComponent = () => {
    if (hotel.events == null) {
      return null
    }

    const { name, tagThemeStyle } = hotel.events

    const promotionText =
      remainedTime > 0 ? `- ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }
  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
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
      </Link>
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

export default HotelItem
