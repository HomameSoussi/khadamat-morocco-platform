import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  MapPin, 
  List,
  Grid,
  SlidersHorizontal
} from 'lucide-react'
import ServiceMap from '../map/ServiceMap'
import { SERVICE_CATEGORIES } from '../../lib/supabase'

const categoryNames = {
  cleaning: 'Nettoyage',
  delivery: 'Livraison',
  handyman: 'Bricolage',
  beauty: 'Beauté',
  tutoring: 'Cours',
  transport: 'Transport',
  tech_support: 'Tech',
  other: 'Autre'
}

const categoryIcons = {
  cleaning: '🧹',
  delivery: '🚚',
  handyman: '🔧',
  beauty: '💄',
  tutoring: '📚',
  transport: '🚗',
  tech_support: '💻',
  other: '⚡'
}

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [viewMode, setViewMode] = useState('map') // 'map' or 'list'
  const [priceRange, setPriceRange] = useState('all')
  const [availability, setAvailability] = useState('all')

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category)
  }

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header with search and filters */}
      <div className="bg-white border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Services sur la carte
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              <MapPin className="h-4 w-4 mr-1" />
              Carte
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-1" />
              Liste
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un service ou prestataire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(SERVICE_CATEGORIES).map(([key, value]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(key)}
              className="flex items-center gap-1"
            >
              <span>{categoryIcons[key]}</span>
              {categoryNames[key]}
            </Button>
          ))}
        </div>

        {/* Quick filters */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Prix:</span>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="0-100">0-100 MAD</SelectItem>
                <SelectItem value="100-300">100-300 MAD</SelectItem>
                <SelectItem value="300+">300+ MAD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Disponibilité:</span>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="busy">Occupé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        {(selectedCategory || searchQuery || priceRange !== 'all' || availability !== 'all') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Filtres actifs:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categoryIcons[selectedCategory]} {categoryNames[selectedCategory]}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {priceRange !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Prix: {priceRange}
                <button
                  onClick={() => setPriceRange('all')}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {availability !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {availability === 'available' ? 'Disponible' : 'Occupé'}
                <button
                  onClick={() => setAvailability('all')}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory('')
                setSearchQuery('')
                setPriceRange('all')
                setAvailability('all')
              }}
              className="text-red-600 hover:text-red-700"
            >
              Effacer tout
            </Button>
          </div>
        )}
      </div>

      {/* Map or List View */}
      <div className="flex-1 relative">
        {viewMode === 'map' ? (
          <ServiceMap
            selectedCategory={selectedCategory}
            onProviderSelect={handleProviderSelect}
          />
        ) : (
          <div className="p-4 h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* List view would show provider cards here */}
              <Card>
                <CardHeader>
                  <CardTitle>Vue liste</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    La vue liste sera implémentée avec les mêmes données que la carte.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="bg-white border-t px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {selectedCategory 
              ? `Services de ${categoryNames[selectedCategory].toLowerCase()}`
              : 'Tous les services'
            }
          </span>
          <span>4 prestataires trouvés dans un rayon de 5km</span>
        </div>
      </div>
    </div>
  )
}
