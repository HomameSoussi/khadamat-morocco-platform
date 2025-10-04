import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MapPage from './components/pages/MapPage'

export default function SimpleAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard' or 'map'

  if (isLoggedIn) {
    if (currentPage === 'map') {
      return (
        <div className="h-screen flex flex-col">
          {/* Simple navigation */}
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-emerald-600">Khadamat</h1>
              <div className="flex gap-2">
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('dashboard')}
                >
                  Accueil
                </Button>
                <Button
                  variant={currentPage === 'map' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('map')}
                >
                  Carte
                </Button>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
            >
              Déconnexion
            </Button>
          </div>
          <div className="flex-1">
            <MapPage />
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Simple navigation */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-emerald-600">Khadamat</h1>
            <div className="flex gap-2">
              <Button
                variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('dashboard')}
              >
                Accueil
              </Button>
              <Button
                variant={currentPage === 'map' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('map')}
              >
                Carte
              </Button>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
          >
            Déconnexion
          </Button>
        </div>

        <div className="p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white mb-6">
              <h1 className="text-3xl font-bold mb-2">Bienvenue sur Khadamat !</h1>
              <p className="text-emerald-100">
                Votre plateforme de services à la demande au Maroc
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🧹 Services de nettoyage
                  </CardTitle>
                  <CardDescription>
                    Trouvez des professionnels du nettoyage près de chez vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCurrentPage('map')}
                  >
                    Rechercher
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🚚 Livraison
                  </CardTitle>
                  <CardDescription>
                    Services de livraison rapide et fiable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCurrentPage('map')}
                  >
                    Commander
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔧 Bricolage
                  </CardTitle>
                  <CardDescription>
                    Artisans qualifiés pour vos réparations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCurrentPage('map')}
                  >
                    Demander
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💄 Beauté & Bien-être
                  </CardTitle>
                  <CardDescription>
                    Services de beauté à domicile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCurrentPage('map')}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📚 Cours particuliers
                  </CardTitle>
                  <CardDescription>
                    Professeurs qualifiés pour tous niveaux
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCurrentPage('map')}
                  >
                    Trouver
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🚗 Transport
                  </CardTitle>
                  <CardDescription>
                    Services de transport et déménagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCurrentPage('map')}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">1,200+</div>
                <div className="text-sm text-gray-600">Prestataires</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">15,000+</div>
                <div className="text-sm text-gray-600">Services réalisés</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">4.8/5</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-gray-600">Support client</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
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
