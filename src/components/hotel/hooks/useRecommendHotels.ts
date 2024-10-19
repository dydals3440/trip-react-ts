import { useQuery } from 'react-query'
import { getRecommendHotels } from '@remote/hotel'

function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  console.log(JSON.stringify(hotelIds), hotelIds)
  return useQuery(
    ['recommendHotels', JSON.stringify(hotelIds)],
    () => getRecommendHotels(hotelIds),
    {
      // 추천 호텔 없으면 함수를 호출하지 않음.
      enabled: hotelIds.length > 0,
    },
  )
}

export default useRecommendHotels
