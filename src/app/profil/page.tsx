'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import { User, Mail, Phone, LogOut, Loader2, ShieldCheck, ChevronRight, Settings, Sparkles, ClipboardList, Heart, HelpCircle, Info, MessageSquare } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('locataires')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          if (error.code !== 'PGRST116') {
            console.error('Error fetching profile details:', error.message || error)
          }
        } else {
          setProfile(data)
        }
      } catch (err) {
        console.error('Unexpected error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menuItems = [
    { icon: ClipboardList, label: 'Mes visites', path: '/visites' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ]

  return (
    <main className="min-h-screen bg-background text-white pb-32">
      <Header />

      <div className="px-6 space-y-8 mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-600">
            <Loader2 className="animate-spin mb-6" size={48} strokeWidth={1} />
            <p className="font-black tracking-widest uppercase text-[10px]">Chargement...</p>
          </div>
        ) : profile ? (
          <>
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center animate-fade-in bg-white p-10 rounded-[48px] shadow-premium mb-10">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full bg-slate-900 flex items-center justify-center border-4 border-primary shadow-xl">
                  <span className="text-4xl font-black text-primary">
                    {profile.prenom?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-black p-2 rounded-xl border-4 border-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>
              
              <h2 className="text-3xl font-black tracking-tighter italic text-black">
                {profile.prenom} {profile.nom}
              </h2>
              <p className="text-slate-500 text-sm font-bold mt-2">{profile.email}</p>
              
              <div className="mt-6 flex gap-2">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">Membre Or</span>
                <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">Vérifié</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-white font-black text-xl italic px-4 mb-6">Mon Compte</h3>
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.path)}
                  className="w-full bg-white p-6 rounded-[32px] flex items-center justify-between text-black font-black hover:bg-slate-100 transition-all group shadow-soft"
                >
                  <span className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-100 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon size={24} />
                    </div>
                    <span className="text-base">{item.label}</span>
                  </span>
                  <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            {/* Sign Out */}
            <div className="animate-fade-in pt-8" style={{ animationDelay: '0.2s' }}>
              <button 
                onClick={handleSignOut}
                className="w-full bg-rose-500 text-white p-6 rounded-[32px] flex items-center justify-center gap-3 font-black hover:bg-rose-600 transition-all active:scale-[0.98] shadow-xl shadow-rose-500/20"
              >
                <LogOut size={22} />
                <span className="text-base uppercase tracking-widest">Déconnexion</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-card rounded-[40px] border border-dashed border-border/50 px-8">
            <div className="bg-slate-900 w-20 h-20 rounded-3xl flex items-center justify-center text-slate-700">
              <User size={40} />
            </div>
            <div>
              <h3 className="text-white font-black text-xl tracking-tight mb-2 italic">Session expirée</h3>
              <p className="text-slate-500 text-sm font-bold max-w-[200px] mx-auto">
                Veuillez vous reconnecter pour accéder à votre profil.
              </p>
            </div>
            <button 
              onClick={handleSignOut}
              className="bg-primary text-black font-black px-10 py-4 rounded-2xl shadow-xl shadow-primary/10 transition-all active:scale-95"
            >
              Se connecter
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  )
}


