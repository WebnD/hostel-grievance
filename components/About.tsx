'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 bg-gray-50" ref={aboutRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700">
        <div className="lg:text-center">
          <h2 className="text-base text-[#3B82F6] font-semibold tracking-wide uppercase">About</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Empowering Students of IIT Bhubaneswar
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            The Hostel Grievance Portal is a student-driven initiative designed to streamline the process of addressing and resolving hostel-related issues.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {[
              {
                name: 'Easy Submission',
                description: 'Submit your grievances quickly and easily through our user-friendly interface.',
              },
              {
                name: 'Track Progress',
                description: 'Stay updated on the status of your submitted grievances in real-time.',
              },
              {
                name: 'Efficient Resolution',
                description: 'Our system ensures that your concerns are addressed promptly by the relevant authorities.',
              },
              {
                name: 'Transparency',
                description: 'Get insights into the grievance resolution process and timelines.',
              },
            ].map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

