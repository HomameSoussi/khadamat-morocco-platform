import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Menu, 
  Home, 
  Search, 
  MapPin, 
  MessageCircle, 
  User, 
  Settings,
  Bell,
  Star,
  Briefcase,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { generateAvatarUrl } from '../../lib/utils'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, profile, signOut, isProvider } = useAuth()

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home, current: true },
    { name: 'Rechercher', href: '/search', icon: Search, current: false },
    { name: 'Carte', href: '/map', icon: MapPin, current: false },
    { name: 'Messages', href: '/messages', icon: MessageCircle, current: false },
    ...(isProvider ? [
      { name: 'Mes Services', href: '/services', icon: Briefcase, current: false },
      { name: 'Demandes', href: '/requests', icon: Bell, current: false }
    ] : []),
    { name: 'Profil', href: '/profile', icon: User, current: false },
    { name: 'Paramètres', href: '/settings', icon: Settings, current: false }
  ]

  const handleSignOut = async () => {
    await signOut()
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col h-full">
                {/* User info */}
                <div className="flex items-center space-x-3 p-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={generateAvatarUrl(profile?.full_name || 'User')} />
                    <AvatarFallback>
                      {profile?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {profile?.full_name || 'Utilisateur'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {profile?.role === 'provider' ? 'Prestataire' : 'Client'}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        item.current
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          item.current ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Sign out */}
                <div className="p-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Déconnexion
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center">
            <h1 className="text-xl font-bold text-emerald-600">Khadamat</h1>
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold text-emerald-600">Khadamat</h1>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3 p-4 mt-5 border-b">
            <Avatar className="h-10 w-10">
              <AvatarImage src={generateAvatarUrl(profile?.full_name || 'User')} />
              <AvatarFallback>
                {profile?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.full_name || 'Utilisateur'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profile?.role === 'provider' ? 'Prestataire' : 'Client'}
              </p>
              {profile?.rating && (
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500 ml-1">
                    {profile.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Sign out */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
