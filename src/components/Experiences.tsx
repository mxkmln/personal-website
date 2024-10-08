'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Plus, X } from 'lucide-react'

type Experience = {
  company: string
  logo: string
  role: string
  timeline: string
  keyProjects: string[]
}

export default function Experiences() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const expandedRef = useRef<HTMLDivElement | null>(null)

  const experiences: Experience[] = [
    {
      company: 'Curefit',
      logo: '/logos/curefit.png',
      role: 'Lead, Founders Office',
      timeline: '2021-2024',
      keyProjects: [
        'Led CEOs office, Program managed ~25 PMs for CPTO',
        'Cultsport(D2C)IPO prep: Capability building and plan of action',
        'Product manager for in app hyperlocal social network',
        'Built product impact dashboard for tech team of ~200 folks',
     'Tech talent branding: Linkedin, Tech blogs, Tech Careers Page'
      ]
    },
    {
      company: 'Bounce',
      logo: '/logos/Bounce.png',
      role: 'Manager, Strategy and Special projects',
      timeline: '2020-2021',
      keyProjects: [
        'Unit economics playbook for new city launch',
        'Investor Relations and external comms',
        'Diversification charter',
        'B2B partnerships with startup ecosystem',
        'GTM for used vehicle sales'
      ]
    },
    {
      company: 'Flipkart',
      logo: '/logos/flipkart.png',
      role: 'Business Analyst',
      timeline: '2015-2017',
      keyProjects: [
        'Time motion studies for process improvement',
        'Automated route planning via clustering algos',
        'Last Mile Org and incentive design',
        'GPS deployment and GPS led billing for vendor vehicles',
        'Digitalisation: Paper->App based deliveries and returns'
      ]
    }
  ]

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const handleExpand = useCallback((index: number) => {
    if (isMobile) {
      setExpandedIndex(prevIndex => prevIndex === index ? null : index)
    }
  }, [isMobile])

  const handleMouseEnter = useCallback((index: number) => {
    if (!isMobile) {
      setExpandedIndex(index)
    }
  }, [isMobile])

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (!isMobile && expandedRef.current && !expandedRef.current.contains(e.relatedTarget as Node)) {
      setExpandedIndex(null)
    }
  }, [isMobile])

  return (
    <section className="mb-12 relative">
      <h2 className="text-2xl mb-4">Experience</h2>
      <div className="flex flex-wrap -mx-2">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="w-36 h-36 border rounded-lg transition-all duration-300 ease-in-out relative cursor-pointer m-2 flex flex-col items-center justify-center"
            onClick={() => handleExpand(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <Image 
              src={exp.logo}
              alt={exp.company}
              width={38}
              height={38}
              className="object-contain filter grayscale mb-2"
            />
            <h3 className="text-center text-sm">{exp.company}</h3>
            <Plus className="absolute bottom-1 right-1 text-gray-400" size={16} />
          </div>
        ))}
      </div>
      {expandedIndex !== null && (
        <div 
          ref={expandedRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setExpandedIndex(null)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setExpandedIndex(null)}
            >
              <X size={24} />
            </button>
            <div className="flex items-start mb-6">
              <Image 
                src={experiences[expandedIndex].logo}
                alt={experiences[expandedIndex].company}
                width={38}
                height={38}
                className="mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">{experiences[expandedIndex].company}</h3>
                <p className="text-lg">{experiences[expandedIndex].role}</p>
                <p className="text-sm text-gray-600">{experiences[expandedIndex].timeline}</p>
              </div>
            </div>
            <div>
              <strong className="text-lg">Key Projects:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {experiences[expandedIndex].keyProjects.map((project, projectIndex) => (
                  <li key={projectIndex}>{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}