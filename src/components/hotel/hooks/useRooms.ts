import { useQuery, useQueryClient } from 'react-query'
import { useEffect } from 'react'
// 실시간 변화 감지
import { onSnapshot, collection, doc } from 'firebase/firestore'

import { getRooms } from '@remote/room'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'

function useRooms({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()
  useEffect(() => {
    // 1. 구독
    // 첫번째 인자, 바뀌고 싶어하는 컬렉션, 두번쨰 인자, 변경되었을 떄 snapshot
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))

        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [hotelId, client])
  return useQuery(['rooms', hotelId], () => getRooms(hotelId))
}

export default useRooms
