import { Reservation } from '@models/reservation'
import { setDoc, doc, getDoc, updateDoc, collection } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'

export async function makeReservation(newReservation: Reservation) {
  // 호텔과, 객실에 대한 정보를 가져와야함.
  // 예약을 한다는 것은 객실의 숫자가 하나 줄어드는 것
  // 다른 사람이 먼저, 예약을 해서, 잔여개수가 0일수도있음. 이미 매진이 된 상품이기에, 예약을 할 수 없도록 만들어주어야 함.
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)

  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const 지금잔여객실수 = room.availableCount

  if (지금잔여객실수 === 0) {
    throw new Error('현재 남은 방이 없습니다.')
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      availableCount: 지금잔여객실수 - 1,
    }),
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}
