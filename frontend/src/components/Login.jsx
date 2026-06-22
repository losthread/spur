import { Button } from './ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'

export default function CardDemo({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleRegister = () => {
    navigate("/register")
  };

  const handleNormalLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try 
    {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json()

      if (response.ok)
      {
        localStorage.setItem('access_token', data.access_token);
        setIsLoggedIn(true)
        navigate('/');
      }    
      else
      {
        setError(data.detail || "Login Failed")
      }
    }

    catch (err) 
    {
      setError(`Error logging in ${err}`);
    }

    finally 
    {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try 
    {
      const response = await fetch('http://localhost:8000/login/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) 
      {
        localStorage.setItem('access_token', data.access_token);
        navigate('/');
      } 
      else 
      {
        setError(data.detail || 'Google login failed');
      }
    } 
    
    catch (err) 
    {
      setError(`Error with Google login ${err}`);
    }
  }

  return (
    <section className='flex items-center justify-center lg:my-10'>
      <Card className="w-full max-w-sm bg-black/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Button variant="link" onClick={handleRegister} >Sign Up</Button>
          </CardAction>
        </CardHeader>

        <form onSubmit={handleNormalLogin}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex-col lg:gap-4 lg:mt-7 ">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError('Google login failed')}
              />
          </CardFooter>
        </form>
      </Card>
    </section>
  )
}
