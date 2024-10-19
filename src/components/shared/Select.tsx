import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import { forwardRef, SelectHTMLAttributes } from 'react'

interface Option {
  label: string
  value: string | number | undefined
}

// 기본 select 컴포넌트의 모든걸 받을 수 있게함
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder: string
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 15px;
  padding: 0 16px;
  cursor: pointer;

  // 값이 없거나, 온전치않으면 (필수값을 만족하지 않으면)
  &:required:invalid {
    color: #c0c4c7;
  }
`

// forwardRef를 통해, 외부에서 label이나 focus 이런거 받을 수 있음.
// 첫번쨰 타입은, 어떤 ref를 받을지 타입, 두번쨰는, 어떤 프롭스를 받을지에 대한 정보를 넘겨주면됨.
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        {/* 이 값은 단순히 보여주는 용도임 */}
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

export default Select
