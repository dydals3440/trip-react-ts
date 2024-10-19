import useHotels from '@components/hotelList/hooks/useHotels'

import Top from '@shared/Top'
import Hotel from '@components/hotelList/Hotel'
import { Fragment } from 'react'
import Spacing from '@shared/Spacing'
import InfiniteScroll from 'react-infinite-scroll-component'

const HotelListPage = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
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
              <Hotel hotel={hotel} />

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

export default HotelListPage
