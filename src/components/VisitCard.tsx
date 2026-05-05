'use client'

import Image from 'next/image'
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VisitCardProps {
  id: string
  propertyTitle: string
  propertyLocation: string
  propertyImage: string
  visitDate: string
  status: 'en_attente' | 'acceptee' | 'refusee'
}

export default function VisitCard({
  propertyTitle,
  propertyLocation,
  propertyImage,
  visitDate,
  status
}: VisitCardProps) {
  const statusStyles = {
    en_attente: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    acceptee: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    refusee: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  }

  const statusLabels = {
    en_attente: 'En attente',
    acceptee: 'Confirmée',
    refusee: 'Annulée',
  }

  return (
    <div className="bg-[#111614] rounded-[32px] p-5 flex items-center gap-5 border border-border/30 shadow-soft transition-all duration-300 hover:bg-[#1a211e] group border-l-4 border-l-primary/30">
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
        <Image
          src={propertyImage || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400'}
          alt={propertyTitle}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="flex-grow min-w-0 space-y-2">
        <div className="flex flex-col gap-1">
          <span className={cn(
            "w-fit px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border",
            statusStyles[status]
          )}>
            {statusLabels[status]}
          </span>
          <h3 className="text-white font-black text-base truncate tracking-tight italic group-hover:text-primary transition-colors">{propertyTitle}</h3>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin size={12} className="text-primary/50" />
          <span className="text-[11px] font-bold truncate tracking-tight">{propertyLocation}</span>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1.5 text-slate-300">
            <div className="p-1.5 bg-slate-900 rounded-lg">
              <Calendar size={12} className="text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">{new Date(visitDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 text-slate-600 group-hover:text-primary transition-colors pr-1">
        <ChevronRight size={20} />
      </div>
    </div>
  )
}
