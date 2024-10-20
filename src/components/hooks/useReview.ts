import { getReviews } from '@remote/review'
import { useQuery } from 'react-query'

function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  return { data, isLoading }
}

export default useReview
