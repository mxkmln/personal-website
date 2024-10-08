'use client'

import React, { useState } from 'react'

export default function MyClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">My Client Component</h2>
      <p className="mb-4">You clicked the button {count} times.</p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  )
}