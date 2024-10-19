import useLike from '@components/hotel/hooks/like/useLike'
import { useCallback, useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { Like } from '@models/like'
import { updateOrder } from '@remote/like'
import { useAlertContext } from '@contexts/AlertContext'

function useEditLike() {
  const { data = [] } = useLike()
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const { open } = useAlertContext()
  const client = useQueryClient()

  // data가 변경되는 시점을 catch
  useEffect(() => {
    if (data != null) setUpdatedLikes(data)
  }, [data])

  const reorder = useCallback(
    (from: number, to: number) => {
      setIsEdit(true)
      setUpdatedLikes((prevUpdatedLikes) => {
        const newItems = [...prevUpdatedLikes]

        // 먼저 1개를 잘라냄
        const [fromItem] = newItems.splice(from, 1)

        if (fromItem != null) {
          newItems.splice(to, 0, fromItem)
        }

        newItems.forEach((like, index) => {
          like.order = index + 1
        })

        return newItems
      })
    },
    [data],
  )

  // 실제 서버 저장
  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueriesData(['likes'], updatedLikes)
      setIsEdit(false)
    } catch (e) {
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          setUpdatedLikes([])
        },
      })
    }
  }

  // console.log(updatedLikes)
  // 유저가 순서를 변경했는지 안했는지
  // const isEdit = updatedLikes.length > 0

  return { data: isEdit ? updatedLikes : data, reorder, isEdit, save }
}

export default useEditLike
