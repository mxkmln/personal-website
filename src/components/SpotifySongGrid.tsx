'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Music, X } from 'lucide-react'

type Song = {
  id: string
  name: string
  artist: string
  albumArt: string
  spotifyUrl: string
}

export default function SpotifySongGrid() {
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch('/api/spotify-songs')
        if (!response.ok) {
          throw new Error('Failed to fetch songs')
        }
        const data = await response.json()
        setSongs(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching songs:', error)
        setError('Failed to load songs. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchSongs()
  }, [])

  if (isLoading) {
    return <div className="text-center text-lg font-bold text-blue-600">Loading songs...</div>
  }

  if (error) {
    return <div className="text-center text-lg font-bold text-red-600">{error}</div>
  }

  if (!songs || songs.length === 0) {
    return <div className="text-center text-lg font-bold text-gray-600">No songs found.</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white"
            onClick={() => setSelectedSong(song)}
          >
            <div className="w-full aspect-square relative">
              <Image
                src={song.albumArt}
                alt={`${song.name} by ${song.artist}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-semibold truncate">{song.name}</p>
              <p className="text-xs text-gray-600 truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedSong && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setSelectedSong(null)}
            >
              <X size={24} />
            </button>
            <div className="w-full aspect-square relative mb-4">
              <Image
                src={selectedSong.albumArt}
                alt={`${selectedSong.name} by ${selectedSong.artist}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{selectedSong.name}</h3>
            <p className="text-gray-600 mb-4">Artist: {selectedSong.artist}</p>
            <a
              href={selectedSong.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              <Music className="mr-2" size={20} />
              Listen on Spotify
            </a>
          </div>
        </div>
      )}
    </div>
  )
}