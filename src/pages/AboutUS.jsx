import { useState } from 'react'
import { GoogleMapCmp } from '../cmps/GoogleMap'

const branches = {
  telAviv: { lat: 32.0853, lng: 34.7818 },
  hadera: { lat: 32.4370, lng: 34.9174 },
  batYam: { lat: 32.0239, lng: 34.7509 }
}

export function AboutUs() {
  const [center, setCenter] = useState(branches.telAviv)

  return (
    <section className="about-us container">
      <h2>About Us</h2>
      <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam
                quo veniam velit dolor reprehenderit, laudantium consequatur neque
                numquam labore quae. Accusamus libero perferendis ducimus? Alias unde
                hic quisquam doloremque.
        </p>

      <div style={{ marginBottom: '1em' }}>
        <button onClick={() => setCenter(branches.telAviv)}>Tel Aviv</button>
        <button onClick={() => setCenter(branches.hadera)}>Hadera</button>
        <button onClick={() => setCenter(branches.batYam)}>Bat Yam</button>
      </div>

      <GoogleMapCmp center={center} />

    </section>
)
}