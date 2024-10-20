import { parse } from 'qs'
import { useEffect } from 'react'
import useReservation from '@components/reservation/hooks/useReservation'
import Summary from '@components/reservation/Summary'
import Spacing from '@shared/Spacing'
import Form from '@components/reservation/Form'
import addDelimiter from '@utils/addDelimiter'

function ReservationPage() {
  const { startDate, endDate, roomId, hotelId, nights } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    roomId: string
    hotelId: string
    nights: string
  }

  useEffect(() => {
    if (
      // 이중 하나라도 값이 없으면
      [startDate, endDate, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [startDate, endDate, roomId, hotelId])

  const { data, isLoading } = useReservation({ hotelId, roomId })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = () => {}

  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights))}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
