'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Home, ShieldCheck, Tag, MapPin, ArrowRight, UserCircle, Sparkles } from 'lucide-react'

export default function SplashPage() {
  const router = useRouter()

  const features = [
    { icon: ShieldCheck, title: 'Vérifiées', desc: 'Biens contrôlés' },
    { icon: Tag, title: 'Prix', desc: 'Meilleures offres' },
    { icon: MapPin, title: 'Algérie', desc: 'Toutes wilayas' },
  ]

  return (
    <main className="min-h-screen bg-[#050706] text-white flex flex-col overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -ml-64 -mb-64" />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full px-6 pt-12">
        <div className="relative h-full w-full rounded-[48px] overflow-hidden shadow-2xl border border-white/5">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
            alt="Luxury Home"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {/* Logo Overlay */}
          <div className="absolute top-10 left-10">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-2 border border-white/20 shadow-premium">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black tracking-tighter italic text-white drop-shadow-lg">Dar-Connect</span>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">L'immobilier de prestige</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter leading-tight italic">
              Trouvez votre <br />
              <span className="text-primary">havre de paix.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex-grow px-10 flex flex-col justify-center space-y-8 pb-12">
        <div className="space-y-4">
          <button
            onClick={() => router.push('/home')}
            className="w-full bg-primary hover:bg-gold/80 text-black font-black py-6 rounded-[32px] shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 transition-all active:scale-95 group text-sm uppercase tracking-widest"
          >
            <span>Commencer l'aventure</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-[#111614] border border-white/10 hover:bg-white/10 text-white font-black py-6 rounded-[32px] flex items-center justify-center gap-4 transition-all active:scale-95 text-sm uppercase tracking-widest"
          >
            <UserCircle size={22} className="text-primary" />
            <span>Se connecter</span>
          </button>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-4 py-8 border-y border-white/5">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <f.icon size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-tighter text-white">{f.title}</p>
                <p className="text-[8px] font-bold text-slate-500 leading-none">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-slate-500 text-xs font-bold">
            Nouveau ici ?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-primary font-black hover:underline underline-offset-4"
            >
              Créer un compte prestige
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}

