import { useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'



const containerStyle = {
  width: '100%',
  height: '400px'
}

export function GoogleMapCmp({center}) {
    const mapRef = useRef(null)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
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