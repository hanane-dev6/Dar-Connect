'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import VisitCard from '@/components/VisitCard'
import { Loader2, Sparkles, Filter, Inbox } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

interface Visit {
  id: string
  date_visite: string
  statut: 'en_attente' | 'acceptee' | 'refusee'
  maisons: {
    titre: string
    adresse: string
    image_url: string
  }
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'A venir' | 'Passées'>('A venir')
  const supabase = createClient()

  useEffect(() => {
    async function fetchVisits() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('visites')
        .select(`
          *,
          maisons (
            titre,
            adresse,
            image_url
          )
        `)
        .eq('locataire_id', user.id)
        .order('date_visite', { ascending: false })

      if (error) console.error('Error fetching visits:', error)
      else setVisits(data || [])
      setLoading(false)
    }

    fetchVisits()
  }, [])

  const filteredVisits = visits.filter(v => {
    const visitDate = new Date(v.date_visite)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (activeTab === 'A venir') return visitDate >= today
    return visitDate < today
  })

  return (
    <main className="min-h-screen bg-[#050706] text-white pb-40">
      <Header />

      <div className="px-6 space-y-10 mt-8">
        {/* Title Section */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tableau de bord</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter leading-tight italic">Vos visites</h2>
          </div>
          <button className="p-4 bg-[#111614] border border-border/40 rounded-2xl text-slate-400 hover:text-primary transition-all">
            <Filter size={24} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-[#111614] rounded-[28px] animate-fade-in border border-white/5" style={{ animationDelay: '0.1s' }}>
          {['A venir', 'Passées'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "flex-1 py-4 text-[11px] font-black uppercase tracking-widest rounded-[22px] transition-all",
                activeTab === tab ? "bg-[#050706] text-primary shadow-xl border border-white/5" : "text-slate-500 hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Visits List */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-700">
              <Loader2 className="animate-spin mb-6" size={48} strokeWidth={1} />
              <p className="font-black tracking-widest uppercase text-[10px]">Synchronisation...</p>
            </div>
          ) : filteredVisits.length > 0 ? (
            <div className="grid gap-6">
              {filteredVisits.map((visit) => (
                <VisitCard
                  key={visit.id}
                  id={visit.id}
                  propertyTitle={visit.maisons.titre}
                  propertyLocation={visit.maisons.adresse}
                  propertyImage={visit.maisons.image_url}
                  visitDate={visit.date_visite}
                  status={visit.statut}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#111614]/50 rounded-[40px] border border-dashed border-border/30 px-10">
              <div className="bg-slate-900 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-700">
                <Inbox size={40} />
              </div>
              <h4 className="font-black text-white text-lg mb-2">Aucun rendez-vous</h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-[200px] mx-auto">
                {activeTab === 'A venir' 
                  ? "Vous n'avez pas de visites prévues prochainement." 
                  : "Aucun historique de visites disponible."}
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
