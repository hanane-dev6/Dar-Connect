'use client'

import { Home, ClipboardList, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/home' },
    { icon: ClipboardList, label: 'Visites', path: '/visites' },
    { icon: User, label: 'Profil', path: '/profil' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-8 pb-10">
      <div className="mx-auto max-w-sm bg-[#0a110f]/80 backdrop-blur-2xl rounded-[32px] px-4 py-3 shadow-2xl flex items-center justify-around border border-white/5">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-primary scale-110' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
