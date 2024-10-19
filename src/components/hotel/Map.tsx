import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { Hotel } from '@models/hotel'

function Map({ location }: { location: Hotel['location'] }) {
  const {
    directions,
    pointGeolocation: { x, y },
  } = location
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
  })

  if (!isLoaded) {
    return null
  }

  return (
    <Flex direction="column" style={{ padding: '24px' }}>
      <Text bold typography="t4">
        기본 정보
      </Text>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '250px',
          margin: '16px 0',
          boxSizing: 'border-box',
        }}
        center={{
          lat: y,
          lng: x,
        }}
        zoom={10}
      >
        <Marker position={{ lat: y, lng: x }} />
      </GoogleMap>
      <Text typography="t6">{directions}</Text>
    </Flex>
  )
}

export default Map
