"use client"

import Link from 'next/link'
import { ShoppingCart, Search } from 'lucide-react'
import { LogoutButton } from '@/components/logoutButton'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(Cookies.get('isLoggedIn') === 'true')
  }, [])

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          E-Commerce
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/categories" className="text-gray-600 hover:text-primary">Categories</Link>
          <Link href="/sale" className="text-gray-600 hover:text-primary">Sale</Link>
          <Link href="/clearance" className="text-gray-600 hover:text-primary">Clearance</Link>
          <Link href="/new-stock" className="text-gray-600 hover:text-primary">New Stock</Link>
          <Link href="/trending" className="text-gray-600 hover:text-primary">Trending</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="text-gray-600 hover:text-primary">
            <Search size={24} />
          </button>
          <button aria-label="Cart" className="text-gray-600 hover:text-primary">
            <ShoppingCart size={24} />
          </button>
          {isLoggedIn && <LogoutButton />}
        </div>
      </div>
      <div className="bg-primary text-white text-center py-2">
        Get 10% off on business signup
      </div>
    </header>
  )
}