'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import PropertyCard from '@/components/PropertyCard'
import { Search, SlidersHorizontal, Loader2, Calendar, MessageSquare, ChevronDown, Sparkles, Building2, Bell } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface Maison {
  id: string
  titre: string
  ville: string
  adresse: string
  prix: number
  description: string
  image_url: string
  type: string
  surface: number
  nombre_chambres: number
}

export default function HomePage() {
  const [houses, setHouses] = useState<Maison[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [userName, setUserName] = useState('Yacine')
  const supabase = createClient()

  useEffect(() => {
    async function getData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name.split(' ')[0])
      }

      const { data, error } = await supabase
        .from('maisons')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) setHouses(data)
      setLoading(false)
    }
    getData()
  }, [])

  const filteredHouses = houses.filter(h => 
    h.titre.toLowerCase().includes(search.toLowerCase()) ||
    h.ville.toLowerCase().includes(search.toLowerCase()) ||
    h.adresse.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#050b09] text-white pb-40">
      {/* Premium Header Design (Reverted to more beautiful version) */}
      <div className="sticky top-0 z-50 bg-[#050b09]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 bg-white/5 rounded-[20px] flex items-center justify-center p-2.5 border border-white/10 group-hover:border-primary/40 transition-all shadow-xl">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black italic tracking-tighter leading-none group-hover:text-primary transition-colors">Dar-Connect</h1>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.25em] mt-1.5">
                  Bienvenue, <span className="text-primary">{userName}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors relative group">
                <Bell size={20} className="text-slate-400 group-hover:text-primary" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-[#050b09]" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-primary/20 text-primary font-black">
                {userName?.[0]?.toUpperCase()}
              </div>
            </div>
            </div>
          </div>

          {/* Centered Integrated Search */}
          <div className="relative group max-w-2xl mx-auto w-full">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Rechercher une ville, un quartier, une villa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-12 text-sm font-bold focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all placeholder:text-slate-600 shadow-inner"
            />
            <button className="absolute inset-y-0 right-0 px-6 text-slate-500 hover:text-primary transition-colors">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[2px] bg-primary"></div>
              <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Catalogue Algérie</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter">
              {filteredHouses.length} <span className="text-slate-500">biens disponibles</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
            <button className="px-6 py-2.5 bg-primary text-black text-xs font-black rounded-xl shadow-lg shadow-primary/20">Tout voir</button>
            <button className="px-6 py-2.5 text-slate-400 text-xs font-black hover:text-white transition-colors">Villas</button>
            <button className="px-6 py-2.5 text-slate-400 text-xs font-black hover:text-white transition-colors">Appartements</button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Chargement du catalogue...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredHouses.map((house) => (
              <PropertyCard
                key={house.id}
                id={house.id}
                title={house.titre}
                city={house.ville}
                price={house.prix}
                imageUrl={house.image_url}
                type={house.type}
                surface={house.surface}
                bedrooms={house.nombre_chambres}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
