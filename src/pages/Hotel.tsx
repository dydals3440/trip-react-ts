import { useParams } from 'react-router-dom'

import Top from '@shared/Top'
import useHotel from '@components/hotel/hooks/useHotel'
import Carousel from '@components/hotel/Carousel'
import Contents from '@components/hotel/Conternts'
import Rooms from '@components/hotel/Rooms'
import Map from '@components/hotel/Map'
import RecommendHotels from '@components/hotel/RecommendHotels'
import ActionButtons from '@components/hotel/ActionButtons'
import Review from '@components/hotel/Review'
import ScrollProgressBar from '@shared/ScrollProgressBar'
import { css } from '@emotion/react'

import SEO from '@shared/SEO'
import { meta } from 'eslint-plugin-react/lib/rules/jsx-props-no-spread-multi'
import description = meta.docs.description

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, images, contents, location, recommendHotels } = data

  return (
    <div>
      <SEO title={name} description={comment} image={images[0]} />
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotels={recommendHotels} />
      <Review hotelId={id} />
    </div>
  )
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`

export default HotelPage
