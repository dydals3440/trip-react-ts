import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  // 커서를 기준으로 몇개를 가져올지
  startAfter,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { Hotel } from '@models/hotel'

export async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  const hotelsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )

  // 문서들을 가져옴 -> getDocs 비동기
  const hotelsSnapshot = await getDocs(hotelsQuery)

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}

export default getHotels
