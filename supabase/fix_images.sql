-- Fix the professional images for the properties shown in the screenshot
UPDATE maisons 
SET image_url = 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'
WHERE titre = 'Résidence de Prestige';

UPDATE maisons 
SET image_url = 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800'
WHERE titre = 'Loft Industriel';

UPDATE maisons 
SET image_url = 'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=800'
WHERE titre = 'Maison de Campagne';
