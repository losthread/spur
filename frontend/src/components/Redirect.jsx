import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Redirect() {
  const params = useParams();
  const shortCode = params.shortCode;

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await fetch(`http://localhost:8000/go/${shortCode}`)
        const data = await response.json()

        if (response.ok) 
        {
          window.location.href = data.url
        }
        else 
        {
          window.location.href = '/'
        }
      } 

      catch
      {
        window.location.href = '/'
      }
    }

    redirect()
  }, [shortCode])

  return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>
}