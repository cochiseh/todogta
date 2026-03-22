import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function getBase64Url(filePath) {
    const fileData = fs.readFileSync(filePath);
    const base64 = fileData.toString('base64');
    return `data:image/png;base64,${base64}`;
}

async function uploadDb() {
    const updates = [
        { id: 9, image: getBase64Url('public/images/gta6_economy.png') },
        { id: 12, image: getBase64Url('public/images/gta6_police.png') },
        { id: 13, image: getBase64Url('public/images/gta6_leonida_map.png') }
    ];

    for (const update of updates) {
        console.log(`Updating article ID ${update.id}...`);
        const { error: updErr } = await supabase.from('articles').update({ image: update.image }).eq('id', update.id);
        if (updErr) {
            console.error(`Error updating ID ${update.id}:`, updErr);
        } else {
            console.log(`Successfully updated ID ${update.id}.`);
        }
    }
}

uploadDb();
