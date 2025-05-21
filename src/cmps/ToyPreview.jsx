import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const toyImgs = import.meta.glob('../assets/img/*.png')

export function ToyPreview({ toy }) {
  const [imgUrl, setImgUrl] = useState('')
  const [isImgLoading, setImgLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      const path = Object.keys(toyImgs).find(p =>
        p.includes(`${toy.name}.png`)
      )

      if (path) {
        try {
          const mod = await toyImgs[path]()
          setImgUrl(mod.default)
          setImgLoading(false) 
          return
        } catch (err) {
          
        }
      }
      const fallbackPath = Object.keys(toyImgs).find(p =>
        p.includes('default.png')
      )

      if (fallbackPath) {
        const fallbackMod = await toyImgs[fallbackPath]()
        setImgUrl(fallbackMod.default)
      } else {
        console.error('Fallback image (default.png) not found.')
      }

      setImgLoading(false) 
    }

    setImgLoading(true)
    loadImage()
  }, [toy.name])

  return (
    <Link to={`/toy/${toy._id}`}>
      <article className="toy-preview">
        <h1 className="toy-name">{toy.name}</h1>

        {isImgLoading && <div className="skeleton-loader"></div>}

        <div className="img-container">
          {imgUrl && (
            <img
              src={imgUrl}
              alt={toy.name}
              style={{ display: isImgLoading ? 'none' : 'block' }}
            />
          )}
        </div>

        <h1>Price: ${toy.price}</h1>
        <h1 className={toy.inStock ? 'green' : 'red'}>
          {toy.inStock ? 'In stock' : 'Not in stock'}
        </h1>
      </article>
    </Link>
  )
}