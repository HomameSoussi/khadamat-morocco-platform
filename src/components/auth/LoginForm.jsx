import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Phone, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.jsx'
import { validateMoroccanPhone } from '../../lib/utils'

const emailSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
})

const phoneSchema = z.object({
  phone: z.string().refine(validateMoroccanPhone, 'Numéro de téléphone marocain invalide')
})

const otpSchema = z.object({
  otp: z.string().length(6, 'Le code OTP doit contenir 6 chiffres')
})

export default function LoginForm({ onSuccess, onSwitchToSignup }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [phoneForOTP, setPhoneForOTP] = useState('')
  const { signIn, signInWithOTP, verifyOTP } = useAuth()

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: ''
    }
  })

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  })

  const handleEmailLogin = async (data) => {
    setLoading(true)
    setError('')

    const { error } = await signIn(data.email, data.password)
    
    if (error) {
      setError(error.message)
    } else {
      onSuccess?.()
    }
    
    setLoading(false)
  }

  const handlePhoneLogin = async (data) => {
    setLoading(true)
    setError('')

    const { error } = await signInWithOTP(data.phone)
    
    if (error) {
      setError(error.message)
    } else {
      setOtpSent(true)
      setPhoneForOTP(data.phone)
    }
    
    setLoading(false)
  }

  const handleOTPVerification = async (data) => {
    setLoading(true)
    setError('')

    const { error } = await verifyOTP(phoneForOTP, data.otp)
    
    if (error) {
      setError(error.message)
    } else {
      onSuccess?.()
    }
    
    setLoading(false)
  }

  if (otpSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-600">
            Vérification OTP
          </CardTitle>
          <CardDescription>
            Entrez le code à 6 chiffres envoyé au {phoneForOTP}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={otpForm.handleSubmit(handleOTPVerification)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="otp">Code OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                maxLength={6}
                className="text-center text-lg tracking-widest"
                {...otpForm.register('otp')}
              />
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-red-500">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Vérifier le code
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setOtpSent(false)
                setPhoneForOTP('')
                phoneForm.reset()
              }}
            >
              Retour
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-emerald-600">
          Connexion
        </CardTitle>
        <CardDescription>
          Connectez-vous à votre compte Khadamat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Téléphone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={emailForm.handleSubmit(handleEmailLogin)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...emailForm.register('email')}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.email.message}
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
                    {...emailForm.register('password')}
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
                {emailForm.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Se connecter
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={phoneForm.handleSubmit(handlePhoneLogin)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+212 6 12 34 56 78"
                  {...phoneForm.register('phone')}
                />
                {phoneForm.formState.errors.phone && (
                  <p className="text-sm text-red-500">
                    {phoneForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Envoyer le code OTP
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-emerald-600"
              onClick={onSwitchToSignup}
            >
              Créer un compte
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
