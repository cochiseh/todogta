import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkImages() {
    const { data: articles } = await supabase.from('articles').select('id, title, image');
    const results = { broken: [], ok: [] };

    for (const a of articles) {
        if (!a.image) {
            results.broken.push({ id: a.id, title: a.title, reason: 'No image' });
            continue;
        }
        try {
            const res = await fetch(a.image, { method: 'HEAD' });
            if (!res.ok) {
                results.broken.push({ id: a.id, title: a.title, url: a.image, reason: `Status ${res.status}` });
            } else {
                results.ok.push(a.id);
            }
        } catch (err) {
            results.broken.push({ id: a.id, title: a.title, url: a.image, reason: err.message });
        }
    }

    fs.writeFileSync('broken_images.json', JSON.stringify(results, null, 2));
}

checkImages();
