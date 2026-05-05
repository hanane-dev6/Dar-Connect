'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, MapPin, BedDouble, Move, Calendar, Upload, CheckCircle2, Loader2, Home as HomeIcon, ShieldCheck, Share2, MessageCircle, Sparkles } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [tab, setTab] = useState<'details' | 'photos'>('details')
  
  const [visitDate, setVisitDate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from('maisons')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) console.error('Error fetching property:', error)
      else setProperty(data)
      setLoading(false)
    }

    fetchProperty()
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!visitDate || !file) return

    setSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not found')

      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
      const fileName = `${user.id}/${Date.now()}_${cleanFileName}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents-visites')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('documents-visites')
        .getPublicUrl(fileName)

      const { error: visitError } = await supabase
        .from('visites')
        .insert({
          locataire_id: user.id,
          maison_id: id,
          date_visite: visitDate,
          document_url: publicUrl,
          statut: 'en_attente'
        })

      if (visitError) throw visitError

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting request:', err)
      alert('Une erreur est survenue lors de la soumission.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050706]">
      <Loader2 className="animate-spin text-primary" size={48} strokeWidth={1} />
    </div>
  )

  if (!property) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050706] p-8 text-center">
      <div className="bg-[#111614] p-8 rounded-[40px] mb-8 text-slate-700">
        <HomeIcon size={64} />
      </div>
      <h1 className="text-3xl font-black text-white mb-3 tracking-tighter">Propriété non trouvée</h1>
      <p className="text-slate-500 mb-10 max-w-xs font-bold leading-relaxed">Cette annonce n'existe plus ou a été déplacée par son propriétaire.</p>
      <button 
        onClick={() => router.push('/home')} 
        className="bg-primary text-black font-black px-12 py-5 rounded-3xl shadow-xl shadow-primary/20 transition-all active:scale-95"
      >
        Explorer d'autres biens
      </button>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#050706] text-white pb-40">
      {/* Hero Image Section */}
      <div className="relative h-[55vh] w-full">
        <Image
          src={property.image_url || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200'}
          alt={property.titre}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-transparent to-black/30" />
        
        <div className="absolute top-10 left-6 right-6 flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all active:scale-90"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button className="p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Floating Price Tag */}
        <div className="absolute bottom-12 right-6">
          <div className="bg-primary text-black px-8 py-5 rounded-[32px] shadow-2xl shadow-primary/30 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 text-black/60">Prix de vente</p>
            <p className="text-3xl font-black tracking-tighter leading-none italic">
              {new Intl.NumberFormat('fr-DZ').format(property.prix)} <span className="text-sm">DZD</span>
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-[#111614] rounded-[48px] p-8 md:p-12 shadow-premium border border-border/40">
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Offre Exclusive</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter leading-tight italic">{property.titre}</h1>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <span className="text-base font-bold tracking-tight">{property.ville}, Algérie</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1.5 bg-slate-900/50 rounded-[28px] mb-10 border border-white/5">
            <button 
              onClick={() => setTab('details')}
              className={cn(
                "flex-1 py-4 text-[11px] font-black uppercase tracking-widest rounded-[22px] transition-all",
                tab === 'details' ? "bg-[#111614] text-primary shadow-xl border border-white/5" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Détails du bien
            </button>
            <button 
              onClick={() => setTab('photos')}
              className={cn(
                "flex-1 py-4 text-[11px] font-black uppercase tracking-widest rounded-[22px] transition-all",
                tab === 'photos' ? "bg-[#111614] text-primary shadow-xl border border-white/5" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Galerie Photos
            </button>
          </div>

          {tab === 'details' ? (
            <div className="animate-fade-in space-y-12">
              {/* Key Specs Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: BedDouble, val: property.nombre_chambres, label: 'Chambres' },
                  { icon: Move, val: `${property.surface} m²`, label: 'Surface' },
                  { icon: ShieldCheck, val: 'Vérifié', label: 'Statut' }
                ].map((spec, i) => (
                  <div key={i} className="bg-slate-900/40 p-6 rounded-[32px] flex flex-col items-center gap-2 border border-white/5 group hover:bg-slate-900 transition-colors">
                    <spec.icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-black text-white text-lg tracking-tight leading-none mt-1">{spec.val}</span>
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-black tracking-tight italic flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary rounded-full" />
                  Description
                </h3>
                <p className="text-slate-400 leading-relaxed font-bold text-base">
                  {property.description || 'Cette propriété exceptionnelle offre un cadre de vie moderne et élégant au cœur de la ville. Dotée de finitions haut de gamme, elle représente une opportunité unique pour les investisseurs exigeants.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Organized Gallery with different sizes */}
              <div className="relative aspect-[4/5] md:col-span-2 md:row-span-2 rounded-[40px] overflow-hidden border border-white/10 group shadow-2xl">
                <Image 
                  src={property.image_url || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800`} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Property Main" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-[32px] overflow-hidden border border-white/10 group shadow-xl">
                  <Image 
                    src={property.image_url || `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={`Property ${i}`} 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}

              <div className="relative aspect-video md:col-span-2 rounded-[40px] overflow-hidden border border-white/10 group shadow-2xl">
                <Image 
                  src={property.image_url || `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800`} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Property Wide" 
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-16 space-y-4">
            {!showForm ? (
              <div className="grid gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-white text-black font-black py-6 rounded-[32px] transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] shadow-2xl shadow-white/5"
                >
                  <Calendar size={22} />
                  Réserver une visite
                </button>
                <button
                  className="w-full bg-[#25d366] text-white font-black py-6 rounded-[32px] transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20"
                >
                  <MessageCircle size={22} />
                  Contacter via WhatsApp
                </button>
              </div>
            ) : submitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-[40px] p-12 text-center animate-scale-in">
                <div className="bg-primary w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-black shadow-2xl shadow-primary/30 rotate-6">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-3xl font-black text-white mb-4 tracking-tighter">Demande envoyée !</h4>
                <p className="text-slate-400 font-bold mb-10 max-w-xs mx-auto text-sm leading-relaxed">
                  Votre demande de visite a été transmise au propriétaire. Nous vous notifierons dès qu'elle sera acceptée.
                </p>
                <button
                  onClick={() => router.push('/visites')}
                  className="bg-[#111614] border border-border/60 text-white font-black px-12 py-5 rounded-3xl hover:bg-slate-900 transition-all"
                >
                  Voir mes visites
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-900/40 rounded-[48px] p-10 border border-white/5 animate-slide-up space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-black text-white tracking-tighter italic">Formulaire de visite</h4>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Calendar size={24} />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Date souhaitée</label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-[#111614] border border-border/60 rounded-[24px] py-5 px-8 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Pièce d'identité</label>
                    <label className={cn(
                      "relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-[32px] cursor-pointer transition-all duration-300",
                      file ? "border-primary bg-primary/5" : "border-white/10 bg-[#111614] hover:bg-slate-900 hover:border-primary/40"
                    )}>
                      <div className="flex flex-col items-center justify-center text-center px-6">
                        {file ? (
                          <>
                            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-black mb-3">
                              <CheckCircle2 size={28} />
                            </div>
                            <p className="text-xs font-black text-white truncate max-w-[200px]">{file.name}</p>
                          </>
                        ) : (
                          <>
                            <Upload size={32} className="text-slate-600 mb-3" />
                            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Choisir un fichier</p>
                            <p className="text-[9px] text-slate-600 font-bold mt-2">JPG, PNG ou PDF</p>
                          </>
                        )}
                      </div>
                      <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} required />
                    </label>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-transparent border border-border/60 text-slate-400 font-black py-6 rounded-[28px] hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !visitDate || !file}
                      className="flex-[2] bg-primary hover:bg-gold/80 text-black font-black py-6 rounded-[28px] shadow-2xl shadow-primary/20 disabled:opacity-50 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                      {submitting ? <Loader2 className="animate-spin" size={24} /> : 'Confirmer'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}


