import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qbuahhhrzbkqftuxixrw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const imagePath = 'C:\\Users\\crelocal\\.gemini\\antigravity\\brain\\7ee7fc98-8f98-4bb5-b427-960397eded64\\vi_portal_avatar_1772273899692.png';
const imageBuffer = fs.readFileSync(imagePath);

async function main() {
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from('public-images')
        .upload('authors/vi_portal_avatar.png', imageBuffer, {
            contentType: 'image/png',
            upsert: true
        });

    if (error) {
        console.error('Upload error:', error.message);
        return;
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/public-images/authors/vi_portal_avatar.png`;
    console.log('✅ Avatar uploaded:', publicUrl);

    // Update all articles that have author_img = null
    const { data: updated, error: updateError } = await supabase
        .from('articles')
        .update({ author_img: publicUrl })
        .is('author_img', null)
        .select('id, title');

    if (updateError) {
        console.error('DB update error:', updateError.message);
    } else {
        console.log(`✅ Updated ${updated.length} articles with author avatar:`);
        updated.forEach(a => console.log(`   - ID ${a.id}: ${a.title}`));
    }

    // Now update both n8n workflow files
    for (const filename of ['n8n-gta6-ai-articles-workflow.json', 'n8n-gta6-news-workflow.json']) {
        const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const formatNode = wf.nodes.find(n => n.name === 'Formatear Artículo');
        if (formatNode && formatNode.parameters.jsCode) {
            formatNode.parameters.jsCode = formatNode.parameters.jsCode
                .replace(/author_img: null/g, `author_img: '${publicUrl}'`);
            fs.writeFileSync(filename, JSON.stringify(wf, null, 4));

            // Verify
            const v = JSON.parse(fs.readFileSync(filename, 'utf8'));
            const node = v.nodes.find(n => n.name === 'Formatear Artículo');
            const hasUrl = node.parameters.jsCode.includes('vi_portal_avatar.png');
            console.log(`✅ ${filename}: author_img updated: ${hasUrl ? '✅' : '❌'}`);
        }
    }
}

main().catch(console.error);
