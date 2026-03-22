import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://qbuahhhrzbkqftuxixrw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E';
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImages() {
    console.log('Creating bucket "public-images"...');
    await supabase.storage.createBucket('public-images', { public: true });

    const files = [
        { id: 9, path: 'public/images/gta6_economy.png', name: 'gta6_economy.png' },
        { id: 12, path: 'public/images/gta6_police.png', name: 'gta6_police.png' },
        { id: 13, path: 'public/images/gta6_leonida_map.png', name: 'gta6_leonida_map.png' }
    ];

    const results = {};

    for (const file of files) {
        console.log(`Uploading ${file.name}...`);
        const buffer = fs.readFileSync(path.join(process.cwd(), file.path));
        const { data, error } = await supabase.storage
            .from('public-images')
            .upload(`articles/${file.name}`, buffer, {
                contentType: 'image/png',
                upsert: true
            });

        if (error) {
            console.error('Error uploading:', file.name, error);
            continue;
        }

        const { data: publicData } = supabase.storage
            .from('public-images')
            .getPublicUrl(`articles/${file.name}`);

        console.log(`Uploaded ${file.name} to ${publicData.publicUrl}`);
        results[file.id] = publicData.publicUrl;
    }

    fs.writeFileSync('supabase_images.json', JSON.stringify(results, null, 2));
    console.log('Done!');
}

uploadImages();
