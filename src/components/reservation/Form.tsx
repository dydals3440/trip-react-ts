import { useForm } from 'react-hook-form'
import { Hotel, ReservationForm } from '@models/hotel'

import FixedBottomButton from '@shared/FixedBottomButton'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import Select from '@shared/Select'
import React, { useCallback } from 'react'
import Spacing from '@shared/Spacing'

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: () => void
  buttonLabel: string
}) {
  // 블러 이벤트가 일어날떄 유효성 검사
  const { register, formState, handleSubmit } = useForm({ mode: 'onBlur' })

  // 컴포넌트라는 함수에서, form을 받아서, form에 타입에 맞는, 것을 그려줌.
  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            // hasError={formState.errors[form.id] != null}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [register, formState.errors],
  )

  return (
    <div style={{ padding: 24 }}>
      <Text bold>예약정보</Text>

      <form>
        {forms.map((form) => {
          return (
            <React.Fragment key={form.id}>{component(form)}</React.Fragment>
          )
        })}
      </form>

      <Spacing size={80} />

      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp
    message: string
  }
} = {
  name: {
    // 한글만 받게
    value: /^[가-힣]+$/,
    message: '한글명을 확인해주세요',
  },
  email: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식을 확인해주세요',
  },
  phone: {
    // 숫자만 받게
    value: /^\d+$/,
    message: '휴대전화번호를 확인해주세요',
  },
}

export default Form
