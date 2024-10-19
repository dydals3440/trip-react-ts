import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  limit,
  setDoc,
  doc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { Like } from '@models/like'
import { Hotel } from '@models/hotel'

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc'), // 1, 2, 3, 4
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

// 이미 찜이되어있다면 -> 삭제
// 찜이 되어있지 않다면 -> 등록
export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  userId: string
}) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  // 이미 존재함 => 삭제
  if (findSnapshot.docs.length > 0) {
    // order: 1, 2(삭제), 3 이라는 값이 저장되어있음.
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = removeTarget.data().order

    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    // 더 큰애가 없을떄
    if (updateTargetSnapshot.empty) {
      return deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)
      updateTargetSnapshot.forEach((doc) => {
        // order를 2를 지울시 1,3이라고 저장할 수 없음 앞으로 떙겨줘야함.
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })

      await batch.commit()

      return deleteDoc(removeTarget.ref)
    }
  } else {
    // 없음 => 생성
    // 문서가 2개 저장 order = 2
    // 맨 마지막 문서가 몇번쨰의 order인지 알아야함.
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )
    // 3, 2, 1
    // 생성되는 친구는 3으로 order가 저장되게함 order = 맨마지막 order + 1 => 3
    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order

    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId,
    }

    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
  }
}
