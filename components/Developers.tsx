'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Developers() {
  const developersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (developersRef.current) {
      observer.observe(developersRef.current)
    }

    return () => {
      if (developersRef.current) {
        observer.unobserve(developersRef.current)
      }
    }
  }, [])

  const developers = [
    { name: 'Jane Doe', role: 'Frontend Developer', image: '' },
    { name: 'John Smith', role: 'Backend Developer', image: '' },
    { name: 'Alice Johnson', role: 'UI/UX Designer', image: '' },
  ]

  return (
    <section className="py-16 bg-gray-50" ref={developersRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700">
        <div className="lg:text-center">
          <h2 className="text-base text-[#3B82F6] font-semibold tracking-wide uppercase">Team</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet the Developers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            The talented students behind the Hostel Grievance Portal.
          </p>
        </div>

        <div className="mt-10">
          <ul className="md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {developers.map((developer) => (
              <li key={developer.name} className="py-10 px-6 bg-white text-center rounded-lg xl:px-10 xl:text-left">
                <div className="space-y-6 xl:space-y-10">
                  <Image
                    className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                    src={developer.image}
                    alt=""
                    width={224}
                    height={224}
                  />
                  <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3 className="text-[#3B82F6]">{developer.name}</h3>
                      <p className="text-gray-500">{developer.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

