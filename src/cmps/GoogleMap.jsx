import { useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

// const center = {
//   lat: 32.017136,
//   lng: 34.745441
// }

export function GoogleMapCmp({center}) {
    const mapRef = useRef(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAr5noyJKCOOgdOZy5rOOwjHEyHa8HGAMk'
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      <Marker position={center} />
    </GoogleMap>
)
}