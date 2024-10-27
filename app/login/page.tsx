"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Cookies from 'js-cookie'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would typically send a request to your backend to authenticate the user
      // For this example, we'll just check if the email and password are not empty
      if (email && password) {
        // Set the isLoggedIn cookie
        Cookies.set('isLoggedIn', 'true', { expires: 7 }) // expires in 7 days
        toast.success("Login successful!")
        router.push("/home")
        window.location.reload(); 
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader className="space-y-1">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <h4 className="text-xl font-bold text-center">Welcome back to E-Commerce</h4>
          <p className="text-sm text-muted-foreground text-center">
            The next-gen business marketplace
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}