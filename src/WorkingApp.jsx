import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Star, 
  Phone, 
  MessageCircle,
  Search,
  Filter,
  Menu,
  User,
  Settings,
  LogOut
} from 'lucide-react'

// Mock data for service providers
const mockProviders = [
  {
    id: 1,
    name: 'Fatima El Amrani',
    category: 'cleaning',
    rating: 4.8,
    reviews: 127,
    price: 150,
    available: true,
    distance: 1.2,
    description: 'Service de nettoyage professionnel avec 5 ans d\'expérience',
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
    distance: 0.8,
    description: 'Livraison rapide dans toute la ville de Casablanca',
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
    distance: 2.1,
    description: 'Électricien professionnel certifié, interventions rapides',
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
    distance: 1.5,
    description: 'Coiffeuse et esthéticienne à domicile, 8 ans d\'expérience',
    services: ['Coiffure', 'Manucure', 'Soins visage']
  }
]

const categoryNames = {
  cleaning: 'Nettoyage',
  delivery: 'Livraison',
  handyman: 'Bricolage',
  beauty: 'Beauté',
  tutoring: 'Cours',
  transport: 'Transport'
}

const categoryIcons = {
  cleaning: '🧹',
  delivery: '🚚',
  handyman: '🔧',
  beauty: '💄',
  tutoring: '📚',
  transport: '🚗'
}

export default function WorkingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(null)

  // Authentication component
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-white font-bold">K</span>
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-600">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Connectez-vous à votre compte Khadamat'
                : 'Rejoignez la communauté Khadamat'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Votre nom complet" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+212 6 12 34 56 78" />
                </div>
                
                <div className="space-y-2">
                  <Label>Type de compte</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-auto p-3">
                      <div className="text-center">
                        <div className="text-lg mb-1">👤</div>
                        <div className="text-sm">Client</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-3">
                      <div className="text-center">
                        <div className="text-lg mb-1">💼</div>
                        <div className="text-sm">Prestataire</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setIsLoggedIn(true)}
            >
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </Button>
            
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600"
              >
                {isLogin 
                  ? "Pas encore de compte ? Créer un compte"
                  : "Déjà un compte ? Se connecter"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Provider detail modal
  if (selectedProvider) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedProvider(null)}
            className="flex items-center gap-2"
          >
            ← Retour
          </Button>
          <h1 className="font-semibold">Détails du prestataire</h1>
          <div className="w-8"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Provider info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{categoryIcons[selectedProvider.category]}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedProvider.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{selectedProvider.rating}</span>
                      <span className="text-gray-600">({selectedProvider.reviews} avis)</span>
                    </div>
                    <Badge variant={selectedProvider.available ? "default" : "secondary"}>
                      {selectedProvider.available ? 'Disponible' : 'Occupé'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{selectedProvider.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedProvider.distance} km</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    {selectedProvider.price} MAD
                  </div>
                  <div className="text-sm text-gray-600">Prix de base</div>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!selectedProvider.available}
              >
                Demander le service
              </Button>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services proposés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedProvider.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{service}</span>
                    <Badge variant="outline">Disponible</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Services list page
  if (currentPage === 'services') {
    const filteredProviders = mockProviders.filter(provider => {
      const matchesCategory = !selectedCategory || provider.category === selectedCategory
      const matchesSearch = !searchQuery || 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-2"
            >
              ← Accueil
            </Button>
            <h1 className="font-semibold">Services</h1>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === '' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              Tous
            </Button>
            {Object.entries(categoryNames).map(([key, name]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                <span>{categoryIcons[key]}</span>
                {name}
              </Button>
            ))}
          </div>
        </div>

        {/* Providers list */}
        <div className="p-4 space-y-4">
          {filteredProviders.map((provider) => (
            <Card 
              key={provider.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProvider(provider)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{categoryIcons[provider.category]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{provider.name}</h3>
                      <Badge variant={provider.available ? "default" : "secondary"}>
                        {provider.available ? 'Disponible' : 'Occupé'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-xs text-gray-600">({provider.reviews})</span>
                      </div>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-600">{provider.distance} km</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {provider.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-emerald-600">
                        {provider.price} MAD
                      </span>
                      <span className="text-xs text-gray-500">
                        {categoryNames[provider.category]}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <h1 className="text-xl font-bold text-emerald-600">Khadamat</h1>
        </div>
        <Button variant="ghost" size="sm">
          <User className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">Bienvenue sur Khadamat !</h2>
          <p className="text-emerald-100">
            Votre plateforme de services à la demande au Maroc
          </p>
        </div>

        {/* Quick search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un service..."
              className="pl-10"
              onClick={() => setCurrentPage('services')}
            />
          </div>
        </div>

        {/* Service categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Nos services</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categoryNames).map(([key, name]) => (
              <Card 
                key={key} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedCategory(key)
                  setCurrentPage('services')
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{categoryIcons[key]}</div>
                  <h4 className="font-semibold text-sm">{name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured providers */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Prestataires populaires</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage('services')}
            >
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {mockProviders.slice(0, 3).map((provider) => (
              <Card 
                key={provider.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProvider(provider)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span>{categoryIcons[provider.category]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{provider.name}</h4>
                        <Badge variant={provider.available ? "default" : "secondary"} className="text-xs">
                          {provider.available ? 'Disponible' : 'Occupé'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{provider.rating}</span>
                        </div>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">{provider.distance} km</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs font-medium text-emerald-600">
                          {provider.price} MAD
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">1,200+</div>
              <div className="text-xs text-gray-600">Prestataires</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">4.8/5</div>
              <div className="text-xs text-gray-600">Note moyenne</div>
            </CardContent>
          </Card>
        </div>

        {/* Logout button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  )
}
