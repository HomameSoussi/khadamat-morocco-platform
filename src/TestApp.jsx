import { useState } from 'react'
import { Button } from '@/components/ui/button'

function TestApp() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-emerald-600 mb-4">
          Khadamat Platform Test
        </h1>
        <p className="text-gray-600 mb-6">
          Testing React components and styling
        </p>
        <Button 
          onClick={() => setCount(count + 1)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Count: {count}
        </Button>
      </div>
    </div>
  )
}

export default TestApp
