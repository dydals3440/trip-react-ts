import { getReviews, removeReview, writeReview } from '@remote/review'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useUser from '@components/hotel/hooks/auth/useUser'

function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )
  const user = useUser()
  const client = useQueryClient()

  // mutateAsync는 promise를 반환, 사용처에서 흐름을 제어할 수 있음.
  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }

      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
