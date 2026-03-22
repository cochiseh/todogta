import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
    const { data: articles } = await supabase.from('articles').select('id, title, image').in('id', [9, 10, 12, 13]);
    console.log(JSON.stringify(articles, null, 2));
}

verify();
