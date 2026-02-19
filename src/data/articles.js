// ===== Supabase-backed article data layer =====
// All queries go through Supabase with ISR caching (revalidate every 60s)

import { supabase } from '@/lib/supabase';

// Helper: convert snake_case DB row to camelCase for components
function mapArticle(row) {
    return {
        id: row.id,
        slug: row.slug,
        tag: row.tag,
        tagColor: row.tag_color,
        title: row.title,
        subtitle: row.subtitle,
        desc: row.description,
        author: row.author,
        authorImg: row.author_img,
        time: row.published_at,
        readTime: row.read_time,
        image: row.image,
        content: row.content,
        isPublished: row.is_published,
        isFeatured: row.is_featured,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

// Get all published articles (ordered by newest first)
export async function getArticles() {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('id', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
    return data.map(mapArticle);
}

// Get a single article by ID
export async function getArticleById(id) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', parseInt(id))
        .eq('is_published', true)
        .single();

    if (error) {
        console.error('Error fetching article:', error);
        return null;
    }
    return mapArticle(data);
}

// Get a single article by slug
export async function getArticleBySlug(slug) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (error) return null;
    return mapArticle(data);
}

// Get related articles (exclude current)
export async function getRelatedArticles(currentId, count = 3) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .neq('id', parseInt(currentId))
        .order('id', { ascending: false })
        .limit(count);

    if (error) return [];
    return data.map(mapArticle);
}

// Get featured article(s)
export async function getFeaturedArticle() {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('id', { ascending: false })
        .limit(1)
        .single();

    if (error) return null;
    return mapArticle(data);
}

// Get all article IDs for static generation
export async function getAllArticleIds() {
    const { data, error } = await supabase
        .from('articles')
        .select('id')
        .eq('is_published', true);

    if (error) return [];
    return data.map(row => ({ id: String(row.id) }));
}

// Get articles filtered by tag
export async function getArticlesByTag(tag) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .eq('tag', tag)
        .order('id', { ascending: false });

    if (error) return [];
    return data.map(mapArticle);
}
