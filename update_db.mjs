import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateDb() {
    console.log('Deleting duplicate article ID 10...');
    const { error: delErr } = await supabase.from('articles').delete().eq('id', 10);
    if (delErr) {
        console.error('Error deleting ID 10:', delErr);
    } else {
        console.log('Successfully deleted ID 10.');
    }

    const updates = [
        { id: 9, image: '/images/gta6_economy.png' },
        { id: 12, image: '/images/gta6_police.png' },
        { id: 13, image: '/images/gta6_leonida_map.png' }
    ];

    for (const update of updates) {
        console.log(`Updating article ID ${update.id} with image ${update.image}...`);
        const { error: updErr } = await supabase.from('articles').update({ image: update.image }).eq('id', update.id);
        if (updErr) {
            console.error(`Error updating ID ${update.id}:`, updErr);
        } else {
            console.log(`Successfully updated ID ${update.id}.`);
        }
    }
}

updateDb();
