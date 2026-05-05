-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table A: locataires
CREATE TABLE IF NOT EXISTS locataires (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table B: maisons
CREATE TABLE IF NOT EXISTS maisons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre VARCHAR(200) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    prix NUMERIC(15,2) NOT NULL,
    description TEXT,
    image_url TEXT,
    type VARCHAR(50) CHECK (type IN ('villa', 'appartement', 'maison')),
    surface NUMERIC(6,2),
    nombre_chambres INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table C: visites
CREATE TABLE IF NOT EXISTS visites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    locataire_id UUID NOT NULL REFERENCES locataires(id) ON DELETE CASCADE,
    maison_id UUID NOT NULL REFERENCES maisons(id) ON DELETE CASCADE,
    date_visite DATE NOT NULL,
    statut VARCHAR(20) CHECK (statut IN ('en_attente', 'acceptee', 'refusee')) DEFAULT 'en_attente',
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for visites
ALTER TABLE visites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tenant sees own visits" ON visites;
CREATE POLICY "Tenant sees own visits"
ON visites FOR SELECT
USING (auth.uid() = locataire_id);

DROP POLICY IF EXISTS "Tenant creates own requests" ON visites;
CREATE POLICY "Tenant creates own requests"
ON visites FOR INSERT
WITH CHECK (auth.uid() = locataire_id);

-- RLS for locataires
ALTER TABLE locataires ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON locataires;
CREATE POLICY "Users can view their own profile"
ON locataires FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON locataires;
CREATE POLICY "Users can insert their own profile"
ON locataires FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON locataires;
CREATE POLICY "Users can update their own profile"
ON locataires FOR UPDATE
USING (auth.uid() = id);

-- RLS for maisons (Publicly readable)
ALTER TABLE maisons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view properties" ON maisons;
CREATE POLICY "Anyone can view properties"
ON maisons FOR SELECT
USING (true);

-- Storage Setup (Requires manual creation of bucket 'documents-visites' but policies can be scripted)
-- Policy for Storage: documents-visites
-- Note: These policies assume the bucket 'documents-visites' exists.

DROP POLICY IF EXISTS "Tenants can upload their own documents" ON storage.objects;
CREATE POLICY "Tenants can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'documents-visites' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Tenants can view their own documents" ON storage.objects;
CREATE POLICY "Tenants can view their own documents"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'documents-visites' AND
    (storage.foldername(name))[1] = auth.uid()::text
);


-- Trigger to automatically create a profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.locataires (id, nom, prenom, email, telephone)
  VALUES (
    NEW.id,
    COALESCE(split_part(NEW.raw_user_meta_data->>'full_name', ' ', 2), NEW.raw_user_meta_data->>'full_name'),
    split_part(NEW.raw_user_meta_data->>'full_name', ' ', 1),
    NEW.email,
    NEW.raw_user_meta_data->>'telephone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample Data for maisons (Professional & Unique)
TRUNCATE maisons RESTART IDENTITY CASCADE;
INSERT INTO maisons (titre, ville, adresse, prix, description, image_url, type, surface, nombre_chambres)
VALUES 
('Résidence des Oliviers', 'Alger', 'Hydra', 95000000, 'Superbe villa moderne avec piscine et jardin.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800', 'villa', 450, 5),
('Appartement Horizon', 'Oran', 'Canastel', 42000000, 'F4 de luxe avec vue imprenable sur la mer.', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', 'appartement', 145, 3),
('Villa El Bahia', 'Tipaza', 'Chenoua', 130000000, 'Demeure d''exception en front de mer.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', 'villa', 600, 6);

