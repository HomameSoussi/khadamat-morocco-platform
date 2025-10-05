import { useState, useEffect } from 'react'
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
  LogOut,
  Bell,
  Heart,
  Calendar,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
  X
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
    services: ['Nettoyage maison', 'Nettoyage bureau', 'Nettoyage après travaux'],
    phone: '+212 6 12 34 56 78',
    verified: true,
    completedJobs: 245
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
    services: ['Livraison express', 'Livraison documents', 'Courses'],
    phone: '+212 6 23 45 67 89',
    verified: true,
    completedJobs: 156
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
    services: ['Réparation électrique', 'Installation', 'Dépannage'],
    phone: '+212 6 34 56 78 90',
    verified: true,
    completedJobs: 312
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
    services: ['Coiffure', 'Manucure', 'Soins visage'],
    phone: '+212 6 45 67 89 01',
    verified: true,
    completedJobs: 428
  },
  {
    id: 5,
    name: 'Omar Chakir',
    category: 'tutoring',
    rating: 4.6,
    reviews: 78,
    price: 120,
    available: true,
    distance: 2.3,
    description: 'Professeur de mathématiques et physique, 10 ans d\'expérience',
    services: ['Mathématiques', 'Physique', 'Préparation examens'],
    phone: '+212 6 56 78 90 12',
    verified: true,
    completedJobs: 189
  },
  {
    id: 6,
    name: 'Khadija Alami',
    category: 'transport',
    rating: 4.8,
    reviews: 134,
    price: 80,
    available: true,
    distance: 1.8,
    description: 'Chauffeur professionnel, véhicule climatisé et confortable',
    services: ['Transport personnel', 'Déménagement', 'Livraison'],
    phone: '+212 6 67 89 01 23',
    verified: true,
    completedJobs: 267
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

// Mock user data
const mockUser = {
  name: 'Test User',
  email: 'test@homame.me',
  phone: '+212 6 12 34 56 78',
  avatar: null,
  memberSince: '2024',
  completedBookings: 12,
  favoriteProviders: [1, 4],
  notifications: true
}

export default function EnhancedApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [favorites, setFavorites] = useState(mockUser.favoriteProviders)

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('dashboard')
    setShowProfileMenu(false)
  }

  // Toggle favorite provider
  const toggleFavorite = (providerId) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    )
  }

  // Handle service booking
  const handleBookService = (provider) => {
    setShowBookingModal(true)
    // In a real app, this would open a booking form
    setTimeout(() => {
      setShowBookingModal(false)
      alert(`Service demandé avec succès chez ${provider.name}!`)
    }, 2000)
  }

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
              <Input id="email" type="email" placeholder="votre@email.com" defaultValue="test@homame.me" />
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
              onClick={handleLogin}
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

  // Profile page
  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentPage('dashboard')}
            className="flex items-center gap-2"
          >
            ← Retour
          </Button>
          <h1 className="font-semibold">Mon Profil</h1>
          <div className="w-8"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Membre depuis {user.memberSince}</p>
                </div>
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{user.completedBookings}</div>
                  <div className="text-sm text-gray-600">Services utilisés</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{favorites.length}</div>
                  <div className="text-sm text-gray-600">Favoris</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu options */}
          <div className="space-y-2">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-gray-400" />
                  <span>Mes favoris</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>Mes réservations</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span>Moyens de paiement</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span>Sécurité</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                  <span>Aide et support</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>
          </div>

          {/* Logout button */}
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    )
  }

  // Booking modal
  if (showBookingModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Demande en cours...
              <Button variant="ghost" size="sm" onClick={() => setShowBookingModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p>Envoi de votre demande de service...</p>
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
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => toggleFavorite(selectedProvider.id)}
          >
            <Heart 
              className={`h-4 w-4 ${favorites.includes(selectedProvider.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </Button>
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
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">{selectedProvider.name}</h2>
                    {selectedProvider.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
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
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedProvider.distance} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedProvider.completedJobs} services</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
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
                onClick={() => handleBookService(selectedProvider)}
              >
                {selectedProvider.available ? 'Demander le service' : 'Non disponible'}
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

          {/* Contact info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{selectedProvider.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                  <span>Messagerie disponible</span>
                </div>
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
        provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
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

        {/* Results count */}
        <div className="p-4 pb-2">
          <p className="text-sm text-gray-600">
            {filteredProviders.length} prestataire{filteredProviders.length > 1 ? 's' : ''} trouvé{filteredProviders.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Providers list */}
        <div className="p-4 pt-2 space-y-4">
          {filteredProviders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="font-semibold mb-2">Aucun prestataire trouvé</h3>
                <p className="text-gray-600 text-sm">
                  Essayez de modifier vos critères de recherche
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredProviders.map((provider) => (
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{provider.name}</h3>
                          {provider.verified && (
                            <Shield className="h-3 w-3 text-emerald-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={provider.available ? "default" : "secondary"}>
                            {provider.available ? 'Disponible' : 'Occupé'}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(provider.id)
                            }}
                          >
                            <Heart 
                              className={`h-4 w-4 ${favorites.includes(provider.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                            />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-xs text-gray-600">({provider.reviews})</span>
                        </div>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">{provider.distance} km</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">{provider.completedJobs} services</span>
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
            ))
          )}
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
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <User className="h-4 w-4" />
          </Button>
          
          {/* Profile dropdown menu */}
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-3 border-b">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentPage('profile')
                    setShowProfileMenu(false)
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Mon profil
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Paramètres
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  Aide
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
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
              readOnly
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
                  <p className="text-xs text-gray-600 mt-1">
                    {mockProviders.filter(p => p.category === key).length} prestataires
                  </p>
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
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{provider.name}</h4>
                          {provider.verified && (
                            <Shield className="h-3 w-3 text-emerald-600" />
                          )}
                        </div>
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
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  )
}
