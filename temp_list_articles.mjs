import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkArticles() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title, image, tag');

    if (error) {
        console.error('Error fetching articles:', error);
        return;
    }

    const noImage = articles.filter(a => !a.image || a.image.trim() === '');
    const leonida = articles.filter(a => a.title.toLowerCase().includes('leonida'));

    const output = {
        allArticlesSize: articles.length,
        noImage,
        leonida,
        sampleUrls: articles.map(a => ({ id: a.id, title: a.title, image: a.image }))
    };

    fs.writeFileSync('output.json', JSON.stringify(output, null, 2));
    console.log('Done writing to output.json');
}

checkArticles();
