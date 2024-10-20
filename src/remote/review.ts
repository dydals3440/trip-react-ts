import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Review } from '@models/review'
import { User } from '@models/user'

export async function getReviews({ hotelId }: { hotelId: string }) {
  // 해당 호텔 아이디의 호텔을 가져옴.
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)

  // 쿼리를 만들어줌
  // 1. 컬렉션 접근 (hotelRef)
  const reviewQuery = query(
    // 호텔이라고 하는애 아래에있음.
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  )

  // 리뷰가, 유저에대한 아이디를 갖고있으니, 유저 정보를 뺴와야함.
  const reviewSnapshot = await getDocs(reviewQuery)

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      // 가지고 올떄는 다시 Date 타입으로 변경해야함, Firebase에서, Date 타입을 저장시, Firebase Timestamp 활용
      createdAt: review.createdAt.toDate(),
    } as Review
  })

  // 1 = A, 2 = B, 3 = A 가 작성했다고 가정. (A의 정보를 두번 부르게 됨) 캐시를 할꺼임.
  const userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User }> = []

  for (let review of reviews) {
    const 캐시된유저 = userMap[review.userId]

    if (캐시된유저 == null) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )
      const user = userSnapshot.data() as User

      userMap[review.userId] = user
      results.push({
        ...review,
        user,
      })
    } else {
      // 캐시된 유저가 있으면
      results.push({
        ...review,
        // 캐시된 유저를 저장
        user: 캐시된유저,
      })
    }
  }

  return results
}

// id는 알아서 추가해주기 떄문에 Omit
export function writeReview(review: Omit<Review, 'id'>) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW))

  return setDoc(reviewRef, review)
}

export function removeReview({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) {
  // 1. Detail 호텔 찾음.
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW), reviewId)

  return deleteDoc(reviewRef)
}
