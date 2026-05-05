-- Catalogue de 31 Maisons Réelles en Algérie pour Dar-Connect
-- Exécutez ce script dans votre SQL Editor Supabase

TRUNCATE maisons RESTART IDENTITY CASCADE;

INSERT INTO maisons (titre, ville, adresse, prix, description, image_url, type, surface, nombre_chambres)
VALUES 
-- Alger (10 biens)
('Villa Royale Hydra', 'Alger', 'Hydra, Val d''Hydra', 185000000, 'Villa de grand luxe avec domotique et piscine intérieure.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', 'villa', 600, 8),
('Penthouse Sidi Yahia', 'Alger', 'Sidi Yahia', 75000000, 'Dernier étage avec vue sur toute la ville.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', 'appartement', 250, 5),
('Villa Modern Poirson', 'Alger', 'El Biar, Poirson', 120000000, 'Architecture minimaliste dans un quartier calme.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 'villa', 400, 5),
('Appartement El Aurassi', 'Alger', 'Tagarins', 45000000, 'Appartement rénové avec vue sur le port.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', 'appartement', 120, 3),
('Villa Garden Dely Ibrahim', 'Alger', 'Dely Ibrahim', 90000000, 'Grand jardin avec verger et piscine.', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800', 'villa', 800, 6),
('Duplex Cheraga', 'Alger', 'Cheraga, Résidence', 38000000, 'Duplex moderne proche des centres commerciaux.', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', 'appartement', 160, 4),
('Villa Coloniale Bouzareah', 'Alger', 'Bouzareah', 110000000, 'Charme de l''ancien avec confort moderne.', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', 'villa', 450, 6),
('Studio Business Bab Ezzouar', 'Alger', 'Bab Ezzouar', 22000000, 'Idéal pour cadre ou investissement.', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800', 'appartement', 70, 1),
('Villa Bord de Mer Ain Taya', 'Alger', 'Ain Taya', 65000000, 'Accès direct à la plage, quartier sécurisé.', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800', 'villa', 350, 5),
('Loft Belcourt', 'Alger', 'Belouizdad', 32000000, 'Design industriel dans un quartier historique.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', 'appartement', 140, 3),

-- Oran (7 biens)
('Villa Prestige Canastel', 'Oran', 'Canastel', 140000000, 'Vue imprenable sur la baie d''Oran.', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800', 'villa', 500, 6),
('Appartement Akid Lotfi', 'Oran', 'Akid Lotfi', 42000000, 'Proche de toutes commodités et loisirs.', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800', 'appartement', 150, 3),
('Villa Bel Horizon', 'Oran', 'Santa Cruz Area', 85000000, 'Située sur les hauteurs avec vue forêt et mer.', 'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=800', 'villa', 420, 5),
('Duplex Front de Mer', 'Oran', 'Millenium', 55000000, 'Grande terrasse face au large.', 'https://images.unsplash.com/photo-1567767292278-a4f21ec2d36e?auto=format&fit=crop&q=80&w=800', 'appartement', 180, 4),
('Villa Maraval', 'Oran', 'Maraval', 70000000, 'Quartier résidentiel calme et recherché.', 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800', 'villa', 380, 5),
('Appartement Gambetta', 'Oran', 'Gambetta', 35000000, 'Proche du centre-ville, immeuble de standing.', 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800', 'appartement', 130, 3),
('Villa Ain El Turck', 'Oran', 'Ain El Turck', 95000000, 'Villa de vacances avec piscine et pool house.', 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800', 'villa', 600, 7),

-- Constantine (5 biens)
('Villa Cirta Zouaghi', 'Constantine', 'Zouaghi Slimane', 105000000, 'Prestations de luxe, quartier très calme.', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800', 'villa', 480, 6),
('Appartement Bellevue', 'Constantine', 'Bellevue', 28000000, 'Vue dégagée sur les ponts suspendus.', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', 'appartement', 110, 3),
('Villa El Mansourah', 'Constantine', 'Mansourah', 78000000, 'Architecture classique constantinoise.', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800', 'villa', 400, 5),
('Appartement Nouvelle Ville', 'Constantine', 'Ali Mendjeli', 24000000, 'Proche des universités et commerces.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', 'appartement', 140, 4),
('Villa Ain El Bey', 'Constantine', 'Ain El Bey', 120000000, 'Domaine privé avec parc arboré.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 'villa', 900, 8),

-- Autres Wilayas (9 biens)
('Villa des Pins Annaba', 'Annaba', 'Seraidi', 88000000, 'Havre de paix entre montagne et mer.', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800', 'villa', 450, 5),
('Appartement Front de Mer Bejaia', 'Bejaia', 'Tichy', 32000000, 'Idéal pour résidence secondaire.', 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=800', 'appartement', 100, 2),
('Maison de Campagne Batna', 'Batna', 'Arris', 22000000, 'Authenticité et calme absolu.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', 'maison', 600, 4),
('Villa Palace Tlemcen', 'Tlemcen', 'Lalla Setti', 92000000, 'Vue imprenable sur la cité des Zianides.', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800', 'villa', 500, 6),
('Duplex Setif', 'Setif', 'El Hidhab', 38000000, 'Résidence fermée et sécurisée.', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800', 'appartement', 170, 4),
('Villa Chenoua Tipaza', 'Tipaza', 'Chenoua Plage', 125000000, 'Pieds dans l''eau, villa d''architecte.', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800', 'villa', 550, 6),
('Maison Traditionnelle Ghardaia', 'Ghardaia', 'Beni Isguen', 30000000, 'Patrimoine classé, confort préservé.', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800', 'maison', 250, 4),
('Villa Oasis Biskra', 'Biskra', 'Sidi Okba Area', 45000000, 'Splendide villa avec palmeraie privée.', 'https://images.unsplash.com/photo-1600566752355-3979ff137ccd?auto=format&fit=crop&q=80&w=800', 'villa', 1200, 5),
('Appartement Port Skikda', 'Skikda', 'Stora', 29000000, 'Proche des plages et du port de plaisance.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', 'appartement', 115, 3);
