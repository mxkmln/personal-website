'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'

const DynamicSpotifySongGrid = dynamic(() => import('@/components/SpotifySongGrid'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

type AnimeCharacter = {
  id: number
  name: string
  show: string
  image: string
  description: string
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre style={{ color: 'red' }}>{this.state.error?.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default function LeisurePage() {
  const [activeSection, setActiveSection] = useState<'anime' | 'music'>('anime')
  const [selectedCharacter, setSelectedCharacter] = useState<AnimeCharacter | null>(null)
  const [animeCharacters, setAnimeCharacters] = useState<AnimeCharacter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAnimeCharacters() {
      try {
        const response = await fetch('/data/AnimeCharacters.json')
        if (!response.ok) {
          throw new Error('Failed to fetch anime characters')
        }
        const data = await response.json()
        setAnimeCharacters(data.characters)
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading anime characters:', err)
        setError('Failed to load anime characters. Please try again later.')
        setIsLoading(false)
      }
    }

    loadAnimeCharacters()
  }, [])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null
    target.src = '/placeholder.svg'
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Leisure</h1>
      
      <div className="flex justify-center mb-8">
        <button
          className={`mx-2 px-4 py-2 rounded-full ${activeSection === 'anime' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setActiveSection('anime')}
        >
          Anime
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-full ${activeSection === 'music' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setActiveSection('music')}
        >
          Music
        </button>
      </div>

      {activeSection === 'anime' ? (
        <div>
          <div className="mb-12">
            <p className="mb-4">
              Anime is a significant source of inspiration and entertainment. Drawn to compelling visual aesthetic and cathartic storylines. Their stories of overcoming obstacles and growing stronger have been a constant reminder that with hard work and dedication, I can achieve my goals.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Fav Characters</h2>
          {error && <p className="text-red-500">Error: {error}</p>}
          {!error && isLoading && <p>Loading characters...</p>}
          {!error && !isLoading && animeCharacters.length === 0 && (
            <p>No characters found. Please check your data file.</p>
          )}
          {!error && !isLoading && (
            <ErrorBoundary>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {animeCharacters.map((character) => (
                  <div 
                    key={character.id} 
                    className="flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setSelectedCharacter(character)}
                  >
                    <div className="w-full aspect-square relative mb-2">
                      <Image 
                        src={character.image}
                        alt={character.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={handleImageError}
                        priority={character.id <= 6}
                      />
                    </div>
                    <p className="text-center">{character.name}</p>
                  </div>
                ))}
              </div>
            </ErrorBoundary>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Music sounds better with me</h2>
            
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed mb-4">
{`Yes I have always been a halfway person
I don't like novels which are descriptive 
But I like poetry and song lyrics which is only halfway there and cryptic

Why is music so addictive
I wonder as I look around the world 
Only apocalyptic 

Didn't mean to say I hate everything
(Oops I think I may have slipped it)
But music got me through - my way of scripting 
the spectrum of emotions
often eruptive

sometimes real yet
sometimes fictive
through days of love
and when I was vindictive`}
            </pre>
          </div>

          <h2 className="text-2xl font-bold mb-6">Forever discovering good music and great album art</h2>
          <DynamicSpotifySongGrid />
        </div>
      )}

      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-md w-full relative">
            <button 
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setSelectedCharacter(null)}
            >
              <X size={24} />
            </button>
            <div className="w-48 h-48 relative mx-auto mb-4">
              <Image 
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                fill
                style={{ objectFit: 'cover' }}
                onError={handleImageError}
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{selectedCharacter.name}</h3>
            <p className="text-gray-600 mb-2">From: {selectedCharacter.show}</p>
            <p>{selectedCharacter.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}