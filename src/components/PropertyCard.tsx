'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BedDouble, Move, Car } from 'lucide-react'

interface PropertyCardProps {
  id: string
  title: string
  city: string
  price: number
  imageUrl: string
  type: string
  bedrooms: number
  surface: number
}

export default function PropertyCard({
  id,
  title,
  city,
  price,
  imageUrl,
  type,
  bedrooms,
  surface
}: PropertyCardProps) {
  // Helper to get a color based on type (like in the image)
  const getTypeBadgeColor = (type: string) => {
    switch(type?.toLowerCase()) {
      case 'luxe': return 'bg-[#8d5e32] text-white'
      case 'moderne': return 'bg-[#1c4d3b] text-white'
      case 'jardin': return 'bg-[#0a4d44] text-white'
      case 'studio': return 'bg-[#5e4033] text-white'
      case 'duplex': return 'bg-[#0a3d4d] text-white'
      case 'appartement': return 'bg-[#4d1c3b] text-white'
      default: return 'bg-slate-800 text-white'
    }
  }

  return (
    <Link href={`/maison/${id}`} className="block group">
      <div className="bg-[#0a0d0c] rounded-[16px] overflow-hidden border border-white/5 transition-all duration-300 hover:border-primary/20 group-active:scale-[0.98]">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={imageUrl || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
            }}
          />
          
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${getTypeBadgeColor(type)}`}>
              {type || 'Luxe'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-white font-bold text-lg leading-tight truncate">{title}</h3>
            <p className="text-slate-500 text-sm font-medium">{city}, Algérie</p>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-300">{bedrooms}</span>
              <span className="text-[11px] font-medium">ch.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-300">{surface} m²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-300">1</span>
              <span className="text-[11px] font-medium">Garage</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[#c5a059] font-black text-xl tracking-tight">
              {new Intl.NumberFormat('fr-DZ').format(price)} DZD
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
