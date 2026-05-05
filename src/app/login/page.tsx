'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Loader2, ArrowLeft, Sparkles } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    } else {
      router.push('/home')
    }
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white flex flex-col relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
      
      {/* Header Navigation */}
      <div className="px-6 pt-12 pb-4">
        <button 
          onClick={() => router.back()}
          className="h-14 w-14 bg-[#111614] rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-soft active:scale-90 border border-border/40"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-grow flex flex-col px-10 pt-8">
        {/* Branding Section */}
        <div className="flex flex-col mb-12 animate-fade-in">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authentification</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            Bon de <br />
            <span className="text-primary">retour !</span>
          </h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleLogin} className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {error && (
            <div className="bg-rose-500/10 text-rose-500 p-5 rounded-[24px] text-xs font-bold border border-rose-500/20 animate-scale-in">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Identifiant</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full bg-[#111614] border border-border/40 text-white rounded-[24px] py-6 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-700 shadow-soft"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Code Secret</label>
                <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Oublié ?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-600 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111614] border border-border/40 text-white rounded-[24px] py-6 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-700 shadow-soft"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-gold/80 text-black font-black py-6 rounded-[28px] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 text-sm uppercase tracking-widest"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                <span>Accéder au compte</span>
                <Sparkles size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-slate-500 text-xs font-bold">
            Nouvelle expérience ?{' '}
            <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">
              Créer un profil prestige
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
