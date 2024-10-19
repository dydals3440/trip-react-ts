import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { useCallback } from 'react'
import useUser from '@components/hotel/hooks/auth/useUser'
import Spacing from '@shared/Spacing'

function Navbar() {
  const location = useLocation()
  const showSignButton = !['/signup', '/signin'].includes(location.pathname)
  const user = useUser()
  // #TODO 나중에 수정

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to={'/my'}>
            {/*TODO: 나중에 수정*/}
            <img
              src={
                user.photoURL ??
                'https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/circle-user-64.png'
              }
              alt={'유저의 이미지'}
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
          <Spacing size={10} direction={'horizontal'} />
          <Link to={'/settings'}>
            <img
              src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-75-64.png"
              width={40}
              height={40}
              alt="Setting"
            />
          </Link>
        </Flex>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">야호 여행!</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
