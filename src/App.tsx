import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestPage from '@pages/Test'
import HotelList from '@pages/HotelList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<HotelList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
