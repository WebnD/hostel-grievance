'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
      heroRef.current.style.opacity = '0.1'
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <section className="bg-white" ref={heroRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left transition-opacity duration-700">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/iitlogo.png"
                alt="IIT Bhubaneswar Logo"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <h2 className="text-sm font-semibold tracking-wider text-[#1A1A1A] uppercase">
                Indian Institute of Technology
                <span className="block">Bhubaneswar</span>
              </h2>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] sm:text-5xl">
              <span className="block mb-2">Hostel Grievance</span>
              <span className="block text-[#3B82F6]">Portal</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              A streamlined platform for IIT Bhubaneswar students to raise and track hostel-related concerns efficiently.
            </p>
            <div className="mt-8">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-md transition-colors"
              >
                Submit Grievance
              </Link>
            </div>
          </div>
          <div className="hidden md:block opacity-1 transition-opacity duration-1000 delay-500">
            <Image
              src="/iitlogo.png"
              alt="Hostel Building"
              width={400}
              height={400}
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

