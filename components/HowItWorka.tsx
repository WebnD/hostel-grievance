'use client'

import { useEffect, useRef } from 'react'

export default function HowItWorks() {
  const howItWorksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current)
    }

    return () => {
      if (howItWorksRef.current) {
        observer.unobserve(howItWorksRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 bg-white" ref={howItWorksRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700">
        <div className="lg:text-center">
          <h2 className="text-base text-[#3B82F6] font-semibold tracking-wide uppercase">Process</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Follow these simple steps to submit and track your grievances.
          </p>
        </div>

        <div className="mt-10">
          <ol className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {[
              {
                step: 1,
                title: 'Submit a Grievance',
                description: 'Log in to your account and fill out the grievance submission form with details about your concern.',
              },
              {
                step: 2,
                title: 'Grievance Processing',
                description: 'Our system assigns your grievance to the appropriate department for review and action.',
              },
              {
                step: 3,
                title: 'Track and Resolve',
                description: 'Monitor the status of your grievance and receive updates as it progresses towards resolution.',
              },
            ].map((step) => (
              <li key={step.step} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1A1A1A] text-white text-xl font-bold">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg leading-6 font-medium text-gray-900">{step.title}</p>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

