export interface Like {
  id: string
  hotelId: string
  // hotelId를 기준으로, 호텔 정보를 가져오도록 하는게 더 좋을 것 같음.
  hotelName: string
  hotelMainImageUrl: string
  userId: string
  order: number
}
