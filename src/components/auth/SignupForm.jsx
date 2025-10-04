import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, User, Briefcase } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { validateMoroccanPhone, MOROCCO_CITIES } from '../../lib/utils'
import { USER_ROLES } from '../../lib/supabase'

const signupSchema = z.object({
  full_name: z.string().min(2, 'Le nom complet doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
  phone: z.string().refine(validateMoroccanPhone, 'Numéro de téléphone marocain invalide'),
  role: z.enum([USER_ROLES.REQUESTER, USER_ROLES.PROVIDER]),
  city: z.string().min(1, 'Veuillez sélectionner une ville'),
  languages: z.array(z.string()).min(1, 'Veuillez sélectionner au moins une langue'),
  terms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions d\'utilisation')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export default function SignupForm({ onSuccess, onSwitchToLogin }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp } = useAuth()

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      role: USER_ROLES.REQUESTER,
      city: '',
      languages: ['fr'],
      terms: false
    }
  })

  const handleSignup = async (data) => {
    setLoading(true)
    setError('')

    const { error } = await signUp(data.email, data.password, {
      full_name: data.full_name,
      phone: data.phone,
      role: data.role,
      city: data.city,
      languages: data.languages
    })
    
    if (error) {
      setError(error.message)
    } else {
      onSuccess?.()
    }
    
    setLoading(false)
  }

  const watchedRole = form.watch('role')
  const watchedLanguages = form.watch('languages')

  const toggleLanguage = (lang) => {
    const currentLanguages = watchedLanguages || []
    if (currentLanguages.includes(lang)) {
      form.setValue('languages', currentLanguages.filter(l => l !== lang))
    } else {
      form.setValue('languages', [...currentLanguages, lang])
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-emerald-600">
          Créer un compte
        </CardTitle>
        <CardDescription>
          Rejoignez la communauté Khadamat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Type de compte</Label>
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  watchedRole === USER_ROLES.REQUESTER
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => form.setValue('role', USER_ROLES.REQUESTER)}
              >
                <User className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                <p className="text-sm font-medium text-center">Client</p>
                <p className="text-xs text-gray-500 text-center">Demander des services</p>
              </div>
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  watchedRole === USER_ROLES.PROVIDER
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => form.setValue('role', USER_ROLES.PROVIDER)}
              >
                <Briefcase className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                <p className="text-sm font-medium text-center">Prestataire</p>
                <p className="text-xs text-gray-500 text-center">Offrir des services</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="full_name">Nom complet</Label>
            <Input
              id="full_name"
              type="text"
              placeholder="Votre nom complet"
              {...form.register('full_name')}
            />
            {form.formState.errors.full_name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.full_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+212 6 12 34 56 78"
              {...form.register('phone')}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Select onValueChange={(value) => form.setValue('city', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre ville" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(MOROCCO_CITIES).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.city && (
              <p className="text-sm text-red-500">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Langues parlées</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { code: 'ar', name: 'العربية' },
                { code: 'fr', name: 'Français' },
                { code: 'en', name: 'English' }
              ].map((lang) => (
                <div key={lang.code} className="flex items-center space-x-2">
                  <Checkbox
                    id={lang.code}
                    checked={watchedLanguages?.includes(lang.code)}
                    onCheckedChange={() => toggleLanguage(lang.code)}
                  />
                  <Label htmlFor={lang.code} className="text-sm">
                    {lang.name}
                  </Label>
                </div>
              ))}
            </div>
            {form.formState.errors.languages && (
              <p className="text-sm text-red-500">
                {form.formState.errors.languages.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...form.register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...form.register('confirmPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={form.watch('terms')}
              onCheckedChange={(checked) => form.setValue('terms', checked)}
            />
            <Label htmlFor="terms" className="text-sm">
              J'accepte les{' '}
              <a href="#" className="text-emerald-600 hover:underline">
                conditions d'utilisation
              </a>{' '}
              et la{' '}
              <a href="#" className="text-emerald-600 hover:underline">
                politique de confidentialité
              </a>
            </Label>
          </div>
          {form.formState.errors.terms && (
            <p className="text-sm text-red-500">
              {form.formState.errors.terms.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer mon compte
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-emerald-600"
              onClick={onSwitchToLogin}
            >
              Se connecter
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
