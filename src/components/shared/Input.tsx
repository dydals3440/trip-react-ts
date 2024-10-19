import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: blue;
  }

  // 에러가 발생했을 떄 (굳이 에러 프랍없이 가능)
  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
