import { differenceInMilliseconds, parseISO } from 'date-fns'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { MouseEvent, useEffect, useState } from 'react'

import { Hotel } from '@models/hotel'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'

import addDelimiter from '@utils/addDelimiter'
import formatTime from '@utils/formatTime'

function HotelItem({
  hotel,
  isLike,
  onLike,
}: {
  hotel: Hotel
  isLike: boolean
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  }) => void
}) {
  const [remainedTime, setRemainedTime] = useState(0)
  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    // 이미지 안의 하트 버튼이 눌렸을 떄, 이벤트를 죽임.
    e.preventDefault()
    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    })
  }
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
            <Flex
              direction={'column'}
              align={'flex-end'}
              style={{ position: 'relative' }}
            >
              <img
                css={iconHeartStyles}
                src={
                  isLike
                    ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-128.png'
                    : 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/39.Heart-128.png'
                }
                alt="하트"
                onClick={handleLike}
              />
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

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
`

export default HotelItem
