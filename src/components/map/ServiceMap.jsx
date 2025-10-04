import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MapPin, 
  Star, 
  Phone, 
  MessageCircle,
  Navigation,
  Filter,
  Search
} from 'lucide-react'
import { formatCurrency, generateAvatarUrl, calculateDistance, MOROCCO_CITIES } from '../../lib/utils'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icons for different service types
const createCustomIcon = (category, available = true) => {
  const icons = {
    cleaning: '🧹',
    delivery: '🚚',
    handyman: '🔧',
    beauty: '💄',
    tutoring: '📚',
    transport: '🚗',
    tech_support: '💻',
    other: '⚡'
  }
  
  const color = available ? '#10b981' : '#6b7280'
  
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ${icons[category] || icons.other}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  })
}

// Mock service providers data
const mockProviders = [
  {
    id: 1,
    name: 'Fatima El Amrani',
    category: 'cleaning',
    rating: 4.8,
    reviews: 127,
    price: 150,
    available: true,
    position: [33.5731, -7.5898], // Casablanca
    description: 'Service de nettoyage professionnel',
    phone: '+212 6 12 34 56 78',
    services: ['Nettoyage maison', 'Nettoyage bureau', 'Nettoyage après travaux']
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    category: 'delivery',
    rating: 4.9,
    reviews: 89,
    price: 25,
    available: true,
    position: [33.5831, -7.5798], // Casablanca nearby
    description: 'Livraison rapide dans toute la ville',
    phone: '+212 6 23 45 67 89',
    services: ['Livraison express', 'Livraison documents', 'Courses']
  },
  {
    id: 3,
    name: 'Youssef Tazi',
    category: 'handyman',
    rating: 4.7,
    reviews: 156,
    price: 200,
    available: false,
    position: [33.5631, -7.6098], // Casablanca nearby
    description: 'Électricien professionnel certifié',
    phone: '+212 6 34 56 78 90',
    services: ['Réparation électrique', 'Installation', 'Dépannage']
  },
  {
    id: 4,
    name: 'Aicha Benali',
    category: 'beauty',
    rating: 4.9,
    reviews: 203,
    price: 300,
    available: true,
    position: [33.5931, -7.5698], // Casablanca nearby
    description: 'Coiffeuse et esthéticienne à domicile',
    phone: '+212 6 45 67 89 01',
    services: ['Coiffure', 'Manucure', 'Soins visage']
  }
]

function LocationButton() {
  const map = useMap()
  
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          map.setView([latitude, longitude], 15)
        },
        (error) => {
          console.error('Error getting location:', error)
          // Fallback to Casablanca
          map.setView([33.5731, -7.5898], 12)
        }
      )
    }
  }

  return (
    <Button
      onClick={handleLocationClick}
      size="sm"
      className="absolute top-4 right-4 z-[1000] bg-white text-gray-700 hover:bg-gray-50 shadow-lg"
      variant="outline"
    >
      <Navigation className="h-4 w-4 mr-2" />
      Ma position
    </Button>
  )
}

export default function ServiceMap({ selectedCategory, onProviderSelect }) {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [userLocation, setUserLocation] = useState([33.5731, -7.5898]) // Default to Casablanca
  const [filteredProviders, setFilteredProviders] = useState(mockProviders)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  useEffect(() => {
    // Filter providers by category
    if (selectedCategory) {
      setFilteredProviders(mockProviders.filter(p => p.category === selectedCategory))
    } else {
      setFilteredProviders(mockProviders)
    }
  }, [selectedCategory])

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider)
    onProviderSelect?.(provider)
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={userLocation}
        zoom={12}
        className="h-full w-full rounded-lg"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationButton />
        
        {/* User location marker */}
        <Marker position={userLocation}>
          <Popup>
            <div className="text-center">
              <p className="font-semibold">Votre position</p>
            </div>
          </Popup>
        </Marker>

        {/* Service provider markers */}
        {filteredProviders.map((provider) => (
          <Marker
            key={provider.id}
            position={provider.position}
            icon={createCustomIcon(provider.category, provider.available)}
            eventHandlers={{
              click: () => handleProviderClick(provider)
            }}
          >
            <Popup>
              <div className="w-64 p-2">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={generateAvatarUrl(provider.name)} />
                    <AvatarFallback>
                      {provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{provider.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">
                        {provider.rating} ({provider.reviews})
                      </span>
                    </div>
                  </div>
                  <Badge variant={provider.available ? "default" : "secondary"}>
                    {provider.available ? 'Disponible' : 'Occupé'}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-emerald-600">
                    {formatCurrency(provider.price)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {calculateDistance(
                      userLocation[0], userLocation[1],
                      provider.position[0], provider.position[1]
                    ).toFixed(1)} km
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Appeler
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
                  disabled={!provider.available}
                >
                  Demander le service
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Selected provider details card */}
      {selectedProvider && (
        <Card className="absolute bottom-4 left-4 right-4 z-[1000] max-w-sm mx-auto">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{selectedProvider.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProvider(null)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm">
                  {selectedProvider.rating} ({selectedProvider.reviews} avis)
                </span>
                <Badge variant={selectedProvider.available ? "default" : "secondary"}>
                  {selectedProvider.available ? 'Disponible' : 'Occupé'}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600">{selectedProvider.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 text-lg">
                  {formatCurrency(selectedProvider.price)}
                </span>
                <span className="text-sm text-gray-500">
                  {calculateDistance(
                    userLocation[0], userLocation[1],
                    selectedProvider.position[0], selectedProvider.position[1]
                  ).toFixed(1)} km
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Appeler
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!selectedProvider.available}
              >
                Demander le service
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
