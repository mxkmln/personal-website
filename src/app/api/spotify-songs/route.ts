import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: 'grant_type=client_credentials'
  })

  const data = await response.json()
  return data.access_token
}

async function fetchTrackInfo(trackId: string, accessToken: string) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch track data for ${trackId}`)
  }

  return response.json()
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'spotify-links.txt')
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      return NextResponse.json({ error: 'Spotify links file not found' }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const links = fileContent.split('\n').filter(Boolean)

    const accessToken = await getAccessToken()

    const songs = await Promise.all(links.map(async (link) => {
      const trackId = link.split('/').pop()
      if (!trackId) {
        console.error(`Invalid track link: ${link}`)
        return null
      }
      try {
        const data = await fetchTrackInfo(trackId, accessToken)
        return {
          id: data.id,
          name: data.name,
          artist: data.artists[0].name,
          albumArt: data.album.images[0].url,
          spotifyUrl: data.external_urls.spotify
        }
      } catch (error) {
        console.error(`Error fetching data for track ${trackId}:`, error)
        return null
      }
    }))

    const validSongs = songs.filter((song): song is NonNullable<typeof song> => song !== null)

    return NextResponse.json(validSongs)
  } catch (error) {
    console.error('Error fetching songs:', error)
    return NextResponse.json({ error: 'Failed to fetch songs' }, { status: 500 })
  }
}