"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('isLoggedIn')
    router.push('/login')
  }

  return (
    <Button onClick={handleLogout} variant="ghost">
      Logout
    </Button>
  )
}