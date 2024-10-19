import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'

import { typographyMap } from '@styles/typography'

function Contents({ contents }: { contents: string }) {
  console.log(typographyMap.t6)
  return (
    <Container>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
  ${typographyMap.t6}

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 18px 0;
  }

  ul {
    // 시작 스타일을 20px 패딩을 줌
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

export default Contents
