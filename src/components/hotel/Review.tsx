import useReview from '@components/hooks/useReview'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import { useCallback } from 'react'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import { format } from 'date-fns'
import useUser from '@components/hotel/hooks/auth/useUser'
import Button from '@shared/Button'
import TextField from '@shared/TextField'

function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading } = useReview({ hotelId })
  const user = useUser()

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            height="40"
            width="40"
            src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_email-1024.png"
            alt="메시지 이미지"
          />
          <Spacing size={10} />
          <Text>아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해주세요!</Text>
        </Flex>
      )
    }
    return (
      <ul>
        {reviews?.map((review) => {
          return (
            <ListRow
              left={
                review.user.photoURL != null ? (
                  <img src={review.user.photoURL} />
                ) : null
              }
              contents={
                <ListRow.Texts
                  title={review.text}
                  subTitle={format(review.createdAt, 'yyyy-MM-dd')}
                />
              }
              right={review.userId === user?.uid ? <Button>삭제</Button> : null}
            />
          )
        })}
      </ul>
    )
  }, [reviews, user])

  if (isLoading === true) {
    return null
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button disabled>작성</Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

export default Review
