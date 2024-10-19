import { Typography, typographyMap } from '@styles/typography'
import { colors, Colors } from '@styles/colorPalette'
import { CSSProperties } from 'react'

import styled from '@emotion/styled'

interface TextProps {
  typography?: Typography
  color?: Colors
  // display 속성 받게 지원 가능
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // var(--red)
    display,
    textAlign,
    // bold vs fontWeight -> bold가 더 우선순위가 높음
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
