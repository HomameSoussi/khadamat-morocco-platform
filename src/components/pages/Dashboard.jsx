import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Plus,
  Filter,
  Zap,
  Users,
  TrendingUp,
  MessageCircle
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { formatCurrency, generateAvatarUrl, MOROCCO_CITIES } from '../../lib/utils'
import { SERVICE_CATEGORIES } from '../../lib/supabase'

const mockServices = [
  {
    id: 1,
    title: 'Nettoyage de maison',
    category: 'cleaning',
    provider: {
      name: 'Fatima El Amrani',
      rating: 4.8,
      reviews: 127,
      avatar: null
    },
    price: 150,
    location: 'Casablanca',
    distance: 2.3,
    available: true,
    description: 'Service de nettoyage professionnel pour votre maison'
  },
  {
    id: 2,
    title: 'Livraison express',
    category: 'delivery',
    provider: {
      name: 'Ahmed Benali',
      rating: 4.9,
      reviews: 89,
      avatar: null
    },
    price: 25,
    location: 'Rabat',
    distance: 1.8,
    available: true,
    description: 'Livraison rapide dans toute la ville'
  },
  {
    id: 3,
    title: 'Réparation électrique',
    category: 'handyman',
    provider: {
      name: 'Youssef Tazi',
      rating: 4.7,
      reviews: 156,
      avatar: null
    },
    price: 200,
    location: 'Marrakech',
    distance: 3.1,
    available: false,
    description: 'Électricien professionnel certifié'
  }
]

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

export default function Dashboard() {
  const { profile, isProvider } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [nearbyServices, setNearbyServices] = useState(mockServices)

  const stats = {
    totalRequests: 24,
    completedServices: 18,
    earnings: 2450,
    rating: 4.8
  }

  const recentActivity = [
    {
      id: 1,
      type: 'request',
      title: 'Nouvelle demande de nettoyage',
      time: '5 min',
      user: 'Sara Alami'
    },
    {
      id: 2,
      type: 'completed',
      title: 'Service de livraison terminé',
      time: '1h',
      user: 'Mohamed Idrissi'
    },
    {
      id: 3,
      type: 'review',
      title: 'Nouvelle évaluation reçue',
      time: '2h',
      rating: 5
    }
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bienvenue, {profile?.full_name?.split(' ')[0] || 'Utilisateur'} !
            </h1>
            <p className="text-emerald-100">
              {isProvider 
                ? 'Gérez vos services et demandes en cours'
                : 'Trouvez les meilleurs services près de chez vous'
              }
            </p>
          </div>
          <div className="hidden md:block">
            <Zap className="h-16 w-16 text-emerald-200" />
          </div>
        </div>
      </div>

      {/* Stats Cards for Providers */}
      {isProvider && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Demandes</p>
                  <p className="text-xl font-bold">{stats.totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Terminés</p>
                  <p className="text-xl font-bold">{stats.completedServices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Note</p>
                  <p className="text-xl font-bold">{stats.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenus</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.earnings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Rechercher des services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Que recherchez-vous ?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {Object.entries(SERVICE_CATEGORIES).map(([key, value]) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(selectedCategory === key ? '' : key)}
                    className="flex items-center gap-1"
                  >
                    <span>{categoryIcons[key]}</span>
                    {categoryNames[key]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services Near You */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Services près de vous
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyServices.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{service.title}</h3>
                          <Badge variant={service.available ? "default" : "secondary"}>
                            {service.available ? 'Disponible' : 'Occupé'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={generateAvatarUrl(service.provider.name)} />
                              <AvatarFallback>
                                {service.provider.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{service.provider.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{service.provider.rating}</span>
                            <span>({service.provider.reviews})</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{service.location} • {service.distance}km</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-emerald-600">
                            {formatCurrency(service.price)}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" disabled={!service.available}>
                              Demander
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isProvider ? (
                <>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un service
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Gérer la disponibilité
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Voir les statistiques
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Recherche avancée
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Services sur la carte
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Mes favoris
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 text-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      {activity.user && (
                        <p className="text-gray-600">par {activity.user}</p>
                      )}
                      {activity.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{activity.rating} étoiles</span>
                        </div>
                      )}
                      <p className="text-gray-500 text-xs">il y a {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Votre zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg font-semibold">{profile?.city || 'Casablanca'}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {nearbyServices.length} services disponibles
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Changer de zone
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
