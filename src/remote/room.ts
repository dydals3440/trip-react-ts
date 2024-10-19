import { doc, getDocs, collection } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'

export async function getRooms(hotelId: string) {
  // 호텔이 가지고 있는 ROOM Collection에 접근
  const snapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  // 객실 정보를 가져옴
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
