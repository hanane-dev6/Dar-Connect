'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Phone, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validations = {
    name: formData.fullName.length > 2,
    email: formData.email.includes('@'),
    phone: formData.phone.length >= 8,
    password: formData.password.length >= 8,
    match: formData.password.length > 0 && formData.password === formData.confirmPassword
  }

  const isValid = Object.values(validations).every(Boolean)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setLoading(true)
    setError(null)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          telephone: formData.phone,
        }
      }
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (authData.user) {
      router.push('/home')
    }
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white flex flex-col relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[120px] rounded-full -mr-40 -mt-40" />
      
      {/* Header Navigation */}
      <div className="px-6 pt-12 pb-4">
        <button 
          onClick={() => router.back()}
          className="h-14 w-14 bg-[#111614] rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-soft active:scale-90 border border-border/40"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-grow flex flex-col px-10 pt-6">
        {/* Branding Section */}
        <div className="flex flex-col mb-10 animate-fade-in">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Nouveau Compte</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            Créez votre <br />
            <span className="text-primary">héritage.</span>
          </h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleRegister} className="space-y-6 pb-20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {error && (
            <div className="bg-rose-500/10 text-rose-500 p-5 rounded-[24px] text-xs font-bold border border-rose-500/20 animate-scale-in">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Nom Complet</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Yacine Belkaid"
                  className="w-full bg-[#111614] border border-border/40 text-white rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-700 shadow-soft"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full bg-[#111614] border border-border/40 text-white rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-700 shadow-soft"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Téléphone</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-primary transition-colors">
                  <Phone size={20} />
                </div>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05 12 34 56 78"
                  className="w-full bg-[#111614] border border-border/40 text-white rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-700 shadow-soft"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Code Secret</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#111614] border border-border/40 text-white rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-700 shadow-soft"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full bg-primary hover:bg-gold/80 text-black font-black py-6 rounded-[28px] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 text-sm uppercase tracking-widest mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                <span>Créer le profil</span>
                <CheckCircle2 size={20} />
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-slate-500 text-xs font-bold">
              Déjà membre ?{' '}
              <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
