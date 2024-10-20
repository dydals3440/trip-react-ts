import useHotels from '@components/hotelList/hooks/useHotels'

import Top from '@shared/Top'
import HotelItem from '@components/hotelList/HotelItem'
import { Fragment } from 'react'
import Spacing from '@shared/Spacing'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLike from '@components/hotel/hooks/like/useLike'
import withSuspense from '@shared/hocs/withSuspense'

const HotelListPage = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: like } = useLike()

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        next={loadMore}
        hasMore={hasNextPage}
        loader={<></>}
        dataLength={hotels?.length ?? 0}
        // 어느 위치에서 트리거하고싶냐?
        scrollThreshold="100px"
      >
        {hotels?.map((hotel, idx) => {
          return (
            <Fragment key={hotel.id}>
              <HotelItem
                onLike={like}
                hotel={hotel}
                // find는 객체를 Return Boolean으로 감쌈
                isLike={Boolean(
                  likes?.find((like) => like.hotelId === hotel.id),
                )}
              />

              {hotels.length - 1 === idx ? null : (
                <Spacing
                  size={8}
                  backgroundColor={'gray100'}
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default withSuspense(HotelListPage, {
  fallback: <div>호텔리스트 불러오는 중...</div>,
})
