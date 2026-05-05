'use client'

import { Bell, Search, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function Header({ title }: { title?: string }) {
  const [userName, setUserName] = useState('Yacine')
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name.split(' ')[0])
      }
    }
    getUser()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-6 flex items-center justify-between bg-[#050706]/90 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-4">
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center p-2 border border-white/10 group-hover:border-primary/40 transition-all">
            <img 
              src="/logo.png" 
              alt="Dar-Connect Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black italic tracking-tighter leading-none group-hover:text-primary transition-colors">Dar-Connect</h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Immobilier de Luxe</span>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-3.5 bg-[#111614] rounded-2xl text-slate-400 hover:text-primary transition-all shadow-soft border border-border/40 relative group">
          <Bell size={20} />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-primary rounded-full border-2 border-[#111614] group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </header>
  )
}
