import { collection, writeBatch, getDocs } from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import Button from '@shared/Button'
import { store } from '@remote/firebase'

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    // 1. 전체 호텔 가져와서
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))
    // 2. 전체 호텔 루프
    snapshot.docs.forEach((hotel) => {
      const 추천호텔리스트 = []

      for (let doc of snapshot.docs) {
        // 3. 호텔 + 추천 호텔 아이디 5개를 추가한다.
        if (추천호텔리스트.length === 5) {
          break
        }

        if (doc.id !== hotel.id) {
          추천호텔리스트.push(doc.id)
        }
      }
      batch.update(hotel.ref, {
        recommendHotels: 추천호텔리스트,
      })
    })

    await batch.commit()
    alert('업데이트가 완료됨!')
    // A = 가나다 B = { 추천호텔 : { A, name: 가나다 } }
    // A = 가나다2 로 호텔병 변경 (호텔에대한 아이디를 사용하여 DB 연결을 시켜줘야함)
    // 호텔에 대한 정보를 그대로 넣는 것이 아닌, id를 넣음
    // A = 가나다 B = { 추천호텔 : { A- id, C- id, D- id } }
  }
  return <Button onClick={handleButtonClick}>추천 호텔 데이터 추가하기</Button>
}

export default RecommendHotelButton
