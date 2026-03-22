import fs from 'fs';

// New jsCode for AI Articles workflow "Formatear Artículo"
const articlesFormatCode = `const item = $input.first();

// Gemini 2.5 Pro is a thinking model: parts[0] may be thinking content.
// Get the LAST part which contains the actual JSON response.
const parts = item.json.candidates[0].content.parts;
const text = parts[parts.length - 1].text;

// Clean potential markdown wrapper
let cleaned = text.trim();
if (cleaned.startsWith('\`\`\`json')) cleaned = cleaned.slice(7);
if (cleaned.startsWith('\`\`\`')) cleaned = cleaned.slice(3);
if (cleaned.endsWith('\`\`\`')) cleaned = cleaned.slice(0, -3);
cleaned = cleaned.trim();

// Extra safety: find the JSON object boundaries
const jsonStart = cleaned.indexOf('{');
const jsonEnd = cleaned.lastIndexOf('}');
if (jsonStart !== -1 && jsonEnd !== -1) {
  cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
}

const parsed = JSON.parse(cleaned);

const theme = $('Seleccionar Tema').first().json.theme;

// Generate slug from title
const slug = parsed.title
  .toLowerCase()
  .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
  .replace(/[^a-z0-9\\s-]/g, '')
  .replace(/\\s+/g, '-')
  .replace(/-+/g, '-')
  .substring(0, 80);

const tagColors = {
  'Análisis': '#6366f1',
  'Oficial': '#3b82f6',
  'Confirmado': '#10b981',
  'Rumor': '#f59e0b',
  'Industria': '#8b5cf6',
  'Trailer': '#ef4444'
};

const wordCount = parsed.content.split(/\\s+/).length;
const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min lectura';

const now = new Date();
const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const publishedAt = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

const imagePool = [
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_beach_sunset_1771888145935.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_economy_1771871443650.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_heist_action_1771888131773.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_helicopter_chase_1771888190604.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_leonida_map_1771871556829.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_lucia_jason_1771888068702.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_motocross_dirt_1771888174051.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_police_1771871305697.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_sports_car_day_1771888113901.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_vice_city_night_1771888084701.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_yacht_ocean_1771888159398.png"
];
const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];

return [{
  json: {
    slug: slug,
    tag: parsed.tag || 'Análisis',
    tag_color: tagColors[parsed.tag] || '#6366f1',
    title: parsed.title,
    subtitle: null,
    description: parsed.description,
    author: 'VI Portal',
    author_img: null,
    published_at: publishedAt,
    read_time: readTime,
    image: randomImage,
    content: parsed.content,
    is_published: true,
    is_featured: false,
    source: 'ai'
  }
}];`;

// New jsCode for News workflow "Formatear Artículo"
const newsFormatCode = `const item = $input.first();

// Gemini 2.5 Flash may also return thinking parts.
// Get the LAST part which contains the actual JSON response.
const parts = item.json.candidates[0].content.parts;
const text = parts[parts.length - 1].text;

// Clean potential markdown wrapper
let cleaned = text.trim();
if (cleaned.startsWith('\`\`\`json')) cleaned = cleaned.slice(7);
if (cleaned.startsWith('\`\`\`')) cleaned = cleaned.slice(3);
if (cleaned.endsWith('\`\`\`')) cleaned = cleaned.slice(0, -3);
cleaned = cleaned.trim();

// Extra safety: find the JSON object boundaries
const jsonStart = cleaned.indexOf('{');
const jsonEnd = cleaned.lastIndexOf('}');
if (jsonStart !== -1 && jsonEnd !== -1) {
  cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
}

const parsed = JSON.parse(cleaned);

// Map tag to color
const tagColors = {
  'Oficial': '#3b82f6',
  'Confirmado': '#10b981',
  'Rumor': '#f59e0b',
  'Industria': '#8b5cf6',
  'Trailer': '#ef4444',
  'Premios': '#ec4899'
};

const slug = $('Generar Slug').first().json.slug;
const wordCount = parsed.content.split(/\\s+/).length;
const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min lectura';

const now = new Date();
const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const publishedAt = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

const imagePool = [
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_beach_sunset_1771888145935.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_economy_1771871443650.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_heist_action_1771888131773.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_helicopter_chase_1771888190604.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_leonida_map_1771871556829.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_lucia_jason_1771888068702.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_motocross_dirt_1771888174051.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_police_1771871305697.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_sports_car_day_1771888113901.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_vice_city_night_1771888084701.png",
  "https://qbuahhhrzbkqftuxixrw.supabase.co/storage/v1/object/public/public-images/articles/gta6_yacht_ocean_1771888159398.png"
];
const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];

return [{
  json: {
    slug: slug,
    tag: parsed.tag || 'Industria',
    tag_color: tagColors[parsed.tag] || '#8b5cf6',
    title: parsed.title,
    subtitle: null,
    description: parsed.description,
    author: 'VI Portal',
    author_img: null,
    published_at: publishedAt,
    read_time: readTime,
    image: randomImage,
    content: parsed.content,
    is_published: true,
    is_featured: false
  }
}];`;

function patchWorkflow(filename, newCode) {
    if (!fs.existsSync(filename)) {
        console.log(`File ${filename} not found.`);
        return;
    }
    const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

    const formatNode = wf.nodes.find(n => n.name === 'Formatear Artículo');
    if (formatNode && formatNode.parameters) {
        formatNode.parameters.jsCode = newCode;
        fs.writeFileSync(filename, JSON.stringify(wf, null, 4));
        console.log(`✅ Patched ${filename} - "Formatear Artículo" node updated`);

        // Verify the patch
        const verify = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const node = verify.nodes.find(n => n.name === 'Formatear Artículo');
        const code = node.parameters.jsCode;

        const hasLastPart = code.includes('parts[parts.length - 1]');
        const hasRandomImage = code.includes('image: randomImage');
        const hasJsonBoundary = code.includes('cleaned.indexOf');

        console.log(`   - Uses last part (thinking-safe): ${hasLastPart ? '✅' : '❌'}`);
        console.log(`   - Uses randomImage for image field: ${hasRandomImage ? '✅' : '❌'}`);
        console.log(`   - Has JSON boundary extraction: ${hasJsonBoundary ? '✅' : '❌'}`);
    } else {
        console.log(`❌ Could not find "Formatear Artículo" node in ${filename}`);
    }
}

console.log('=== Patching n8n workflows ===\n');
patchWorkflow('n8n-gta6-ai-articles-workflow.json', articlesFormatCode);
console.log('');
patchWorkflow('n8n-gta6-news-workflow.json', newsFormatCode);
console.log('\n=== Done! ===');
