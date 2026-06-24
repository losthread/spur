import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Redirect() {
  const params = useParams();
  const shortCode = params.shortCode;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await fetch(`${API_URL}/go/${shortCode}`)
        if (!response.ok) 
          return;

        const data = await response.json()
        window.location.href = data.url;  
      } 
      
      catch (error) {
        console.error(error);
      }
    }

    redirect();
  }, [shortCode, API_URL]);

  return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>
}