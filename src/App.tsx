import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestPage from '@pages/Test'
import HotelList from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import useLoadKakao from '@components/hooks/useLoadKakao'

function App() {
  useLoadKakao()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
