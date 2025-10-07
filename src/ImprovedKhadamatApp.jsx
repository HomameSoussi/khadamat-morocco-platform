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
  X,
  Clock,
  CheckCircle,
  Camera,
  Award,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  ArrowLeft,
  Plus,
  Minus,
  Send,
  Eye,
  ThumbsUp,
  AlertCircle,
  Verified
} from 'lucide-react'

// Enhanced mock data with more realistic Moroccan providers
const mockProviders = [
  {
    id: 1,
    name: 'Fatima El Amrani',
    category: 'cleaning',
    rating: 4.9,
    reviews: 247,
    price: 120,
    available: true,
    distance: 0.8,
    description: 'Spécialiste nettoyage résidentiel et commercial, 8 ans d\'expérience à Casablanca',
    services: ['Nettoyage maison', 'Nettoyage bureau', 'Nettoyage après travaux', 'Désinfection'],
    phone: '+212 6 12 34 56 78',
    verified: true,
    completedJobs: 456,
    responseTime: '< 5 min',
    languages: ['Français', 'Arabe', 'Anglais'],
    workingHours: '8h - 18h',
    gallery: ['cleaning1.jpg', 'cleaning2.jpg', 'cleaning3.jpg'],
    badges: ['Top Rated', 'Quick Response', 'Eco-Friendly'],
    joinedDate: '2020',
    location: 'Maarif, Casablanca'
  },
  {
    id: 2,
    name: 'Ahmed Benali',
    category: 'delivery',
    rating: 4.8,
    reviews: 189,
    price: 25,
    available: true,
    distance: 1.2,
    description: 'Livraison express dans tout Casablanca, véhicule réfrigéré disponible',
    services: ['Livraison express', 'Livraison documents', 'Courses alimentaires', 'Colis fragiles'],
    phone: '+212 6 23 45 67 89',
    verified: true,
    completedJobs: 1234,
    responseTime: '< 2 min',
    languages: ['Français', 'Arabe'],
    workingHours: '7h - 22h',
    gallery: ['delivery1.jpg', 'delivery2.jpg'],
    badges: ['Fast Delivery', 'Reliable', 'Night Service'],
    joinedDate: '2019',
    location: 'Centre-ville, Casablanca'
  },
  {
    id: 3,
    name: 'Youssef Tazi',
    category: 'handyman',
    rating: 4.7,
    reviews: 156,
    price: 180,
    available: false,
    distance: 2.1,
    description: 'Électricien-plombier certifié, interventions d\'urgence 24h/7j',
    services: ['Électricité', 'Plomberie', 'Climatisation', 'Dépannage urgent'],
    phone: '+212 6 34 56 78 90',
    verified: true,
    completedJobs: 678,
    responseTime: '< 10 min',
    languages: ['Français', 'Arabe'],
    workingHours: '24h/24',
    gallery: ['handyman1.jpg', 'handyman2.jpg', 'handyman3.jpg'],
    badges: ['Certified', '24/7 Service', 'Emergency'],
    joinedDate: '2018',
    location: 'Ain Diab, Casablanca'
  },
  {
    id: 4,
    name: 'Aicha Benali',
    category: 'beauty',
    rating: 4.9,
    reviews: 203,
    price: 250,
    available: true,
    distance: 1.5,
    description: 'Coiffeuse-esthéticienne diplômée, soins à domicile haut de gamme',
    services: ['Coiffure', 'Manucure-Pédicure', 'Soins visage', 'Maquillage événements'],
    phone: '+212 6 45 67 89 01',
    verified: true,
    completedJobs: 589,
    responseTime: '< 15 min',
    languages: ['Français', 'Arabe', 'Anglais'],
    workingHours: '9h - 19h',
    gallery: ['beauty1.jpg', 'beauty2.jpg', 'beauty3.jpg', 'beauty4.jpg'],
    badges: ['Premium Service', 'Certified', 'Event Specialist'],
    joinedDate: '2021',
    location: 'Racine, Casablanca'
  }
]

const categoryData = {
  cleaning: { name: 'Nettoyage', icon: '🧹', color: 'bg-blue-500', providers: 45 },
  delivery: { name: 'Livraison', icon: '🚚', color: 'bg-orange-500', providers: 67 },
  handyman: { name: 'Bricolage', icon: '🔧', color: 'bg-purple-500', providers: 34 },
  beauty: { name: 'Beauté', icon: '💄', color: 'bg-pink-500', providers: 28 },
  tutoring: { name: 'Cours', icon: '📚', color: 'bg-green-500', providers: 52 },
  transport: { name: 'Transport', icon: '🚗', color: 'bg-red-500', providers: 89 }
}

// Mock user data
const mockUser = {
  name: 'Utilisateur Test',
  email: 'test@homame.me',
  phone: '+212 6 12 34 56 78',
  avatar: null,
  memberSince: '2024',
  completedBookings: 12,
  favoriteProviders: [1, 4],
  notifications: true,
  location: 'Casablanca, Maroc',
  verified: true
}

export default function ImprovedKhadamatApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [favorites, setFavorites] = useState(mockUser.favoriteProviders)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

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
    setSelectedProvider(provider)
    setShowBookingModal(true)
    setBookingStep(1)
  }

  // Enhanced Authentication Component
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-3xl text-white font-bold">K</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {isLogin ? 'Bienvenue' : 'Rejoignez-nous'}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {isLogin 
                ? 'Connectez-vous à Khadamat'
                : 'Créez votre compte Khadamat'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
                <Input id="name" placeholder="Votre nom complet" className="h-12" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" defaultValue="test@homame.me" className="h-12" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-12" />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                  <Input id="phone" placeholder="+212 6 12 34 56 78" className="h-12" />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Type de compte</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-16 flex-col gap-2 border-2 hover:border-emerald-500 hover:bg-emerald-50">
                      <User className="h-6 w-6" />
                      <span className="text-sm font-medium">Client</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col gap-2 border-2 hover:border-emerald-500 hover:bg-emerald-50">
                      <Award className="h-6 w-6" />
                      <span className="text-sm font-medium">Prestataire</span>
                    </Button>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-lg shadow-lg"
              onClick={handleLogin}
            >
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </Button>
            
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {isLogin 
                  ? "Nouveau sur Khadamat ? Créer un compte"
                  : "Déjà membre ? Se connecter"
                }
              </Button>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Sécurisé</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>1200+ prestataires</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>4.8/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Enhanced Booking Modal
  if (showBookingModal && selectedProvider) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Réserver un service</CardTitle>
              <CardDescription>{selectedProvider.name}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowBookingModal(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    bookingStep >= step ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {bookingStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      bookingStep > step ? 'bg-emerald-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Service Selection */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Choisissez un service</h3>
                <div className="space-y-2">
                  {selectedProvider.services.map((service, index) => (
                    <Button
                      key={index}
                      variant={selectedService === service ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4"
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{service}</div>
                        <div className="text-sm text-gray-500">À partir de {selectedProvider.price} MAD</div>
                      </div>
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  disabled={!selectedService}
                  onClick={() => setBookingStep(2)}
                >
                  Continuer
                </Button>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Date et heure</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Date souhaitée</Label>
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label>Heure préférée</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="">Sélectionner une heure</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setBookingStep(1)}>
                    Retour
                  </Button>
                  <Button 
                    className="flex-1" 
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setBookingStep(3)}
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {bookingStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Confirmation</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heure:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prestataire:</span>
                    <span className="font-medium">{selectedProvider.name}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-emerald-600">{selectedProvider.price} MAD</span>
                  </div>
                </div>
                <div>
                  <Label>Demandes spéciales (optionnel)</Label>
                  <textarea 
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    placeholder="Précisions, instructions particulières..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setBookingStep(2)}>
                    Retour
                  </Button>
                  <Button 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      setShowBookingModal(false)
                      alert('Réservation confirmée ! Le prestataire va vous contacter.')
                    }}
                  >
                    Confirmer la réservation
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Enhanced Chat Modal
  if (showChatModal && selectedProvider) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md h-[600px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{categoryData[selectedProvider.category].icon}</span>
              </div>
              <div>
                <CardTitle className="text-lg">{selectedProvider.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  En ligne
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowChatModal(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">Bonjour ! Je suis disponible pour répondre à vos questions.</p>
                <span className="text-xs text-gray-500">Il y a 2 min</span>
              </div>
              <div className="bg-emerald-500 text-white p-3 rounded-lg max-w-[80%] ml-auto">
                <p className="text-sm">Bonjour, j'aimerais avoir plus d'informations sur vos services.</p>
                <span className="text-xs text-emerald-100">Il y a 1 min</span>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Tapez votre message..." className="flex-1" />
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Enhanced Provider Detail Page
  if (selectedProvider) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-40">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedProvider(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="font-semibold">Profil prestataire</h1>
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
          {/* Provider Header */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">{categoryData[selectedProvider.category].icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{selectedProvider.name}</h2>
                    {selectedProvider.verified && (
                      <Verified className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-emerald-100">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{selectedProvider.rating}</span>
                      <span>({selectedProvider.reviews} avis)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedProvider.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">{selectedProvider.description}</p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProvider.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{selectedProvider.completedJobs}</div>
                  <div className="text-xs text-gray-600">Services réalisés</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{selectedProvider.responseTime}</div>
                  <div className="text-xs text-gray-600">Temps de réponse</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{selectedProvider.joinedDate}</div>
                  <div className="text-xs text-gray-600">Membre depuis</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setShowChatModal(true)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Appeler
                </Button>
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-semibold"
                disabled={!selectedProvider.available}
                onClick={() => handleBookService(selectedProvider)}
              >
                {selectedProvider.available ? (
                  <>
                    <Calendar className="h-5 w-5 mr-2" />
                    Réserver maintenant - {selectedProvider.price} MAD
                  </>
                ) : (
                  'Non disponible'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Services & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Services & Tarifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedProvider.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <span className="font-medium">{service}</span>
                      <div className="text-sm text-gray-600">Service professionnel</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">À partir de {selectedProvider.price} MAD</div>
                      <Badge variant="outline" className="text-xs">Disponible</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Gallery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Galerie de travaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Avis clients ({selectedProvider.reviews})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sarah M.', rating: 5, comment: 'Service excellent, très professionnel et ponctuel. Je recommande vivement !', date: 'Il y a 2 jours' },
                  { name: 'Mohamed K.', rating: 5, comment: 'Travail de qualité, prix correct. Très satisfait du résultat.', date: 'Il y a 1 semaine' },
                  { name: 'Fatima L.', rating: 4, comment: 'Bon service dans l\'ensemble, quelques petits détails à améliorer.', date: 'Il y a 2 semaines' }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{review.name[0]}</span>
                        </div>
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informations de contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{selectedProvider.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Horaires: {selectedProvider.workingHours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span>Langues: {selectedProvider.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{selectedProvider.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Enhanced Profile Page
  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentPage('dashboard')}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="font-semibold text-lg">Mon Profil</h1>
            <div className="w-16"></div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-emerald-100">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-0">
                  <Shield className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
                <span className="text-emerald-100 text-sm">Membre depuis {user.memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6 -mt-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{user.completedBookings}</div>
                <div className="text-sm text-gray-600">Services utilisés</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{favorites.length}</div>
                <div className="text-sm text-gray-600">Favoris</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">4.9</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Mes réservations</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">Mes favoris</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm">Paiements</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-sm">Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Menu Options */}
          <div className="space-y-2">
            {[
              { icon: User, label: 'Informations personnelles', desc: 'Modifier vos données' },
              { icon: Bell, label: 'Notifications', desc: 'Gérer vos préférences' },
              { icon: Shield, label: 'Sécurité', desc: 'Mot de passe et confidentialité' },
              { icon: Globe, label: 'Langue et région', desc: 'Français (Maroc)' },
              { icon: HelpCircle, label: 'Aide et support', desc: 'FAQ et contact' },
              { icon: Settings, label: 'Paramètres', desc: 'Configuration de l\'app' }
            ].map((item, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Logout */}
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 h-12"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    )
  }

  // Enhanced Services List Page
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
        {/* Enhanced Header */}
        <div className="bg-white border-b">
          <div className="p-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Button>
            <h1 className="font-semibold text-lg">Services disponibles</h1>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Enhanced Search */}
          <div className="p-4 pt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un service ou prestataire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Enhanced Categories */}
          <div className="px-4 pb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === '' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory('')}
                className="whitespace-nowrap"
              >
                Tous ({mockProviders.length})
              </Button>
              {Object.entries(categoryData).map(([key, data]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                  className="flex items-center gap-1 whitespace-nowrap"
                >
                  <span>{data.icon}</span>
                  {data.name} ({data.providers})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {filteredProviders.length} prestataire{filteredProviders.length > 1 ? 's' : ''} trouvé{filteredProviders.length > 1 ? 's' : ''}
              {selectedCategory && ` en ${categoryData[selectedCategory].name}`}
            </p>
            <Button variant="ghost" size="sm" className="text-emerald-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trier
            </Button>
          </div>

          {filteredProviders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Aucun prestataire trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos critères de recherche ou explorez d'autres catégories
                </p>
                <Button onClick={() => {setSearchQuery(''); setSelectedCategory('')}}>
                  Voir tous les prestataires
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredProviders.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm"
                  onClick={() => setSelectedProvider(provider)}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Provider Image/Icon */}
                      <div className={`w-24 h-24 ${categoryData[provider.category].color} flex items-center justify-center text-white text-2xl`}>
                        {categoryData[provider.category].icon}
                      </div>
                      
                      {/* Provider Info */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{provider.name}</h3>
                            {provider.verified && (
                              <Verified className="h-4 w-4 text-emerald-600" />
                            )}
                          </div>
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
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{provider.rating}</span>
                            <span className="text-gray-600 text-sm">({provider.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span>{provider.distance} km</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{provider.responseTime}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {provider.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={provider.available ? "default" : "secondary"} className="text-xs">
                              {provider.available ? 'Disponible' : 'Occupé'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {categoryData[provider.category].name}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-600 text-lg">
                              {provider.price} MAD
                            </div>
                            <div className="text-xs text-gray-500">à partir de</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Enhanced Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-600">Khadamat</h1>
              <p className="text-xs text-gray-600">{user.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
              </Button>
              
              {/* Enhanced Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border z-50">
                  <div className="p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setCurrentPage('profile')
                        setShowProfileMenu(false)
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <User className="h-4 w-4" />
                      Mon profil
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <Calendar className="h-4 w-4" />
                      Mes réservations
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <Heart className="h-4 w-4" />
                      Mes favoris
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Enhanced Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Bonjour {user.name.split(' ')[0]} ! 👋</h2>
            <p className="text-emerald-100 mb-4">
              Trouvez le service parfait près de chez vous
            </p>
            <div className="flex items-center gap-4 text-emerald-100 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>1200+ prestataires</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>4.8/5 satisfaction</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>Service rapide</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mb-12"></div>
        </div>

        {/* Enhanced Quick Search */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Que recherchez-vous aujourd'hui ?"
                className="pl-12 h-12 text-lg border-0 bg-gray-50 focus:bg-white transition-colors"
                onClick={() => setCurrentPage('services')}
                readOnly
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setCurrentPage('services')}
              >
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Service Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Nos services</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage('services')}
              className="text-emerald-600"
            >
              Voir tout
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categoryData).map(([key, data]) => (
              <Card 
                key={key} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm group"
                onClick={() => {
                  setSelectedCategory(key)
                  setCurrentPage('services')
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${data.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{data.icon}</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{data.name}</h4>
                  <p className="text-sm text-gray-600">{data.providers} prestataires</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    Disponible 24h/7j
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Featured Providers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Prestataires recommandés</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage('services')}
              className="text-emerald-600"
            >
              Voir tout
            </Button>
          </div>
          <div className="space-y-4">
            {mockProviders.slice(0, 3).map((provider) => (
              <Card 
                key={provider.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm"
                onClick={() => setSelectedProvider(provider)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${categoryData[provider.category].color} rounded-xl flex items-center justify-center text-white text-xl`}>
                      {categoryData[provider.category].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{provider.name}</h4>
                          {provider.verified && (
                            <Verified className="h-4 w-4 text-emerald-600" />
                          )}
                        </div>
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
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-gray-600 text-sm">({provider.reviews})</span>
                        </div>
                        <Badge variant={provider.available ? "default" : "secondary"} className="text-xs">
                          {provider.available ? 'Disponible' : 'Occupé'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {provider.distance} km
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {provider.responseTime}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-600 text-lg">
                            {provider.price} MAD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">1,200+</div>
              <div className="text-sm text-emerald-700 font-medium">Prestataires vérifiés</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">4.8/5</div>
              <div className="text-sm text-yellow-700 font-medium">Satisfaction client</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Service de nettoyage terminé</p>
                  <p className="text-xs text-gray-600">Fatima El Amrani • Il y a 2 jours</p>
                </div>
                <Button size="sm" variant="outline">
                  Noter
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Réservation confirmée</p>
                  <p className="text-xs text-gray-600">Ahmed Benali • Demain 14h00</p>
                </div>
                <Button size="sm" variant="outline">
                  Voir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  )
}
