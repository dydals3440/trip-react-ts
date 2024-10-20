import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@contexts/PrivateRoute'
import Navbar from '@shared/Navbar'
import useLoadKakao from '@components/hooks/useLoadKakao'

// import TestPage from '@pages/Test'
// import HotelList from '@pages/HotelList'
// import HotelPage from '@pages/Hotel'
// import MyPage from '@pages/My'
// import SigninPage from '@pages/Signin'
// import SettingsPage from '@pages/settings'
// import LikePage from '@pages/settings/Like'
// import SchedulePage from '@pages/Schedule'
// import ReservationPage from '@pages/Reservation'
// import ReservationDonePage from '@pages/ReservationDone'
// import ReservationList from '@pages/ReservationList'

// 유저가 첫 페이지에 진입시에 모든 페이지의 정보를 가져오는 것이 아닌, 지금 내가 접근하려는 페이지의 번들만 가져오게 됨.
// 해당 코드에서 사용할 페이지의 정보만 담고있음.
const TestPage = lazy(() => import('@pages/Test'))
const HotelList = lazy(() => import('@pages/HotelList'))
const HotelPage = lazy(() => import('@pages/Hotel'))
const MyPage = lazy(() => import('@pages/My'))
const SigninPage = lazy(() => import('@pages/Signin'))
const SettingsPage = lazy(() => import('@pages/settings'))
const LikePage = lazy(() => import('@pages/settings/Like'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationList = lazy(() => import('@pages/ReservationList'))

function App() {
  useLoadKakao()
  return (
    <Suspense fallback={<>로딩중입니다.</>}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthGuard>
            <Navbar />
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
              <Route
                path="/my"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route path="/signin" element={<SigninPage />} />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/like"
                element={
                  <PrivateRoute>
                    <LikePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <SchedulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRoute>
                    <ReservationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRoute>
                    <ReservationDonePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationList />
                  </PrivateRoute>
                }
              />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  )
}

export default App
