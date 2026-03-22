import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://qbuahhhrzbkqftuxixrw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E';
const supabase = createClient(supabaseUrl, supabaseKey);

const artifactsDir = 'C:\\Users\\crelocal\\.gemini\\antigravity\\brain\\d1f2e615-34e5-4c29-b48e-6a8ef2c44e9a';

async function uploadPool() {
    // Read all files in the artifacts directory
    const files = fs.readdirSync(artifactsDir);

    // Filter for our generated gta6_ PNGs
    const imagesToUpload = files.filter(f => f.startsWith('gta6_') && f.endsWith('.png'));

    const publicUrls = [];

    for (const file of imagesToUpload) {
        console.log(`Uploading ${file}...`);
        const filePath = path.join(artifactsDir, file);
        const buffer = fs.readFileSync(filePath);

        // Use a simpler name for storage (strip the timestamps if possible, or just keep it)
        // e.g. gta6_lucia_jason_12345.png -> gta6_lucia_jason_12345.png
        const { data, error } = await supabase.storage
            .from('public-images')
            .upload(`articles/${file}`, buffer, {
                contentType: 'image/png',
                upsert: true
            });

        if (error) {
            console.error('Error uploading:', file, error);
            continue;
        }

        const { data: publicData } = supabase.storage
            .from('public-images')
            .getPublicUrl(`articles/${file}`);

        console.log(`Uploaded to ${publicData.publicUrl}`);
        publicUrls.push(publicData.publicUrl);
    }

    fs.writeFileSync('pool_urls.json', JSON.stringify(publicUrls, null, 2));
    console.log(`Done! Uploaded ${publicUrls.length} images.`);
    console.log(publicUrls);
}

uploadPool();
