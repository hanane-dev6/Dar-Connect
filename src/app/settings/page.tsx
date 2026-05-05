'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, User, Mail, Phone, Globe, Save, Loader2, Check } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import BottomNav from '@/components/BottomNav'

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    phone: '',
    language: 'Français'
  })
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('locataires')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (data) {
          setProfile(data)
          setFormData({
            prenom: data.prenom || '',
            nom: data.nom || '',
            phone: data.telephone || '',
            language: 'Français'
          })
        }
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase
        .from('locataires')
        .update({
          prenom: formData.prenom,
          nom: formData.nom,
          telephone: formData.phone
        })
        .eq('id', user.id)

      if (!error) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    }
    setSaving(false)
  }

  const languages = ['Français', 'العربية', 'English']

  return (
    <main className="min-h-screen bg-[#050b09] text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#050b09]/90 backdrop-blur-xl border-b border-white/5 px-6 py-6">
        <div className="max-w-xl mx-auto flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black italic tracking-tight">Paramètres</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-10 space-y-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <>
            {/* Personal Info */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Informations Personnelles</span>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Language Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Langue de l'application</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setFormData({...formData, language: lang})}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      formData.language === lang 
                        ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-bold">{lang}</span>
                    {formData.language === lang && <Check size={20} />}
                  </button>
                ))}
              </div>
            </section>

            {/* Save Button */}
            <div className="pt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                  success 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-primary text-black shadow-xl shadow-primary/20 hover:scale-[1.02]'
                }`}
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : success ? (
                  <>
                    <Check size={24} />
                    <span>Enregistré !</span>
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    <span>Sauvegarder</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
