'use client'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import UserMenu from './user-menu'
import AuthButton from './auth-button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const {data: session} = useSession();
  const [role, setRole] = useState<string>("");

  console.log(session);

  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-90'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/iitlogo.png"
            alt="IIT Bhubaneswar Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="font-semibold text-[#1A1A1A]">IIT Bhubaneswar</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/submit" className="text-gray-600 hover:text-[#1A1A1A]">
            Submit
          </Link>
          <Link href="/track" className="text-gray-600 hover:text-[#1A1A1A]">
            Track
          </Link>
          {session ? <UserMenu /> : <AuthButton />}
        </div>

        <div className="md:hidden flex items-center">
        
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-[#1A1A1A]"
          >
            {isOpen ? <X className='text-black' size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-6 space-y-4">
          <Link href="/submit" className="block text-gray-600 hover:text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
            Submit
          </Link>
          <Link href="/track" className="block text-gray-600 hover:text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
            Track
          </Link>
        </div>
      </div>
    </header>

    
  )
}

