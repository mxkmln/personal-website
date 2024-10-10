'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Plus, X } from 'lucide-react'

type Experience = {
  company: string
  logo: string
  role: string
  timeline: string
  keyProjects: string[]
}

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

const ExperienceCard: React.FC<{
  experience: Experience
  index: number
  isExpanded: boolean
  onClick: (index: number) => void
  onMouseEnter: (index: number) => void
  isMobile: boolean
}> = React.memo(({ experience, index, isExpanded, onClick, onMouseEnter, isMobile }) => (
  <div 
    className={`w-36 h-36 border rounded-lg transition-all duration-300 ease-in-out relative cursor-pointer m-2 flex flex-col items-center justify-center ${isExpanded ? 'ring-2 ring-primary' : ''}`}
    onClick={() => onClick(index)}
    onMouseEnter={() => !isMobile && onMouseEnter(index)}
  >
    <Image 
      src={experience.logo}
      alt={experience.company}
      width={38}
      height={38}
      className="object-contain filter grayscale mb-2"
    />
    <h3 className="text-center text-sm">{experience.company}</h3>
    <Plus className="absolute bottom-1 right-1 text-gray-400" size={16} />
  </div>
))

ExperienceCard.displayName = 'ExperienceCard'

const ExpandedView: React.FC<{ experience: Experience; onClose: () => void }> = React.memo(({ experience, onClose }) => (
  <div 
    className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
    onClick={(e) => e.stopPropagation()}
  >
    <button 
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
      onClick={onClose}
    >
      <X size={24} />
    </button>
    <div className="flex items-start mb-6">
      <Image 
        src={experience.logo}
        alt={experience.company}
        width={38}
        height={38}
        className="mr-4"
      />
      <div>
        <h3 className="text-xl font-bold">{experience.company}</h3>
        <p className="text-lg">{experience.role}</p>
        <p className="text-sm text-gray-600">{experience.timeline}</p>
      </div>
    </div>
    <div>
      <strong className="text-lg">Key Projects:</strong>
      <ul className="list-disc list-inside mt-2 space-y-1">
        {experience.keyProjects.map((project, projectIndex) => (
          <li key={projectIndex}>{project}</li>
        ))}
      </ul>
    </div>
  </div>
))

ExpandedView.displayName = 'ExpandedView'

export default function Experiences() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const expandedRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [handleResize])

  const handleExpand = useCallback((index: number) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index)
  }, [])

  const handleMouseEnter = useCallback((index: number) => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setExpandedIndex(index)
      }, 200)
    }
  }, [isMobile])

  const handleClose = useCallback(() => {
    setExpandedIndex(null)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedRef.current && !expandedRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClose])

  return (
    <section className="mb-12 relative">
      <h2 className="text-2xl mb-4 font-bold">Experience</h2>
      <p className="mb-4 text-black-600">
        I have worked at three consumer tech startups including two unicorns. More details in the tiles.
      </p>
      <div className="flex flex-wrap -mx-2">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            experience={exp}
            index={index}
            isExpanded={expandedIndex === index}
            onClick={handleExpand}
            onMouseEnter={handleMouseEnter}
            isMobile={isMobile}
          />
        ))}
      </div>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
          expandedIndex !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      >
        {expandedIndex !== null && (
          <div ref={expandedRef}>
            <ExpandedView 
              experience={experiences[expandedIndex]} 
              onClose={handleClose}
            />
          </div>
        )}
      </div>
    </section>
  )
}