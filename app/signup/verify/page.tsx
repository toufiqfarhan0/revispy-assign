"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const verificationCode = code.join("")
    try {
      // Here you would typically send a request to your backend to verify the code
      // For this example, we'll just check if all digits are filled
      if (verificationCode.length === 6) {
        // Set the isLoggedIn cookie
        Cookies.set('isLoggedIn', 'true', { expires: 7 })// expires in 7 days
        toast.success("Email verified successfully!")
        router.push("/home")
      } else {
        throw new Error("Invalid verification code")
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.")
    }
  }

  const handleResend = () => {
    toast.info("Verification code resent. Please check your email.")
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Verify your email</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            We've sent a 6-digit code to your email. Please enter it below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 text-center"
                />
              ))}
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-muted-foreground w-full">
            Didn't receive a code? Check your spam folder or{" "}
            <Button variant="link" className="p-0" onClick={handleResend}>
              resend it
            </Button>
            .
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}