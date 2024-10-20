export interface Room {
  availableCount: number
  basicInfo: {
    // key는 string이지만, 값은 string or number
    [key: string]: string | number
  }
  imageUrl: string
  price: number
  refundable: boolean
  roomName: string
}
