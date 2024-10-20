import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  getDoc,
  // 커서를 기준으로 몇개를 가져올지
  startAfter,
  doc,
  where,
  documentId,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { Hotel } from '@models/hotel'
import { Room } from '@models/room'

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

export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))

  return {
    id,
    ...snapshot.data(),
  } as Hotel
}

export async function getRecommendHotels(hotelIds: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL),
    // 전체 문서 중에, 문서의 아이디가 포함된 호텔만 뽑아옴.
    where(documentId(), 'in', hotelIds),
  )
  // 추천호텔들을 뽑아옴
  const snapshot = await getDocs(recommendQuery)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )
}

export async function getHotelWithRoom({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId))
  // 호텔의 서브 컬렉션인 room도 가져와야함. (hotel이 갖고있는 룸)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId),
  )

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  }
}
