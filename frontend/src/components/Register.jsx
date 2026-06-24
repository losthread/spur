import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import {
  Card,
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

export default function CardDemo() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(true);
    try
    {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });

      const data = await response.json();
      if (response.ok) 
      {
        navigate('/login');
      } 
      else 
      {
        setError(data.detail || "Registration failed");
      }
    } 
    
    catch (err) 
    {
      setError(`Error registering: ${err.message}`);
    } 
    
    finally 
    {
      setIsLoading(false);
    }
  };

  return (
    <section className='flex items-center justify-center mx-7 my-10'>
      <Card className="w-full max-w-sm bg-black/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>

          <CardDescription>
            Enter your email, username and password below to register your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="abc"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex-col lg:gap-4 mt-7 ">
            <Button 
              type="submit" 
              className="w-full" 
              >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>

            <p className="mt-2 lg:mt-0 text-center text-muted-foreground text-base">
              Already have an account? <Link to="/login" className="text-amber-600 hover:underline">Log in</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </section>
  )
}