import fs from 'fs';

const filename = 'n8n-gta6-news-workflow.json';
const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

// ============================================================
// FIX: The Gemini HTTP node embeds RSS title/content directly
// into the JSON body via {{ }} expressions. When RSS data has
// quotes, newlines, or special chars, it breaks the JSON.
//
// Solution: Add a "Preparar Prompt" Code node between 
// "Generar Slug" and "Gemini Reescribir" that constructs the 
// full Gemini request body safely using JSON.stringify().
// Then Gemini node simply uses {{ $json.geminiBody }}
// ============================================================

// 1. Add the sanitizer Code node
const sanitizerNode = {
    "parameters": {
        "jsCode": `const item = $input.first();
const title = (item.json.title || '').replace(/[\\n\\r]/g, ' ').trim();
const content = (item.json.contentSnippet || item.json.description || '').replace(/[\\n\\r]/g, ' ').trim();

const promptText = \`Eres un periodista de videojuegos experto en GTA 6. Reescribe esta noticia en español para un portal web llamado todogta.es. Hazlo informativo, atractivo y optimizado para SEO.

Título original: \${title}

Contenido original: \${content}

Responde SOLO con un JSON válido (sin markdown, sin \\\`\\\`\\\`json) con esta estructura exacta:
{
  "title": "título en español (max 80 chars)",
  "description": "resumen de 2 frases para SEO",
  "content": "artículo completo en HTML con párrafos <p>, <h2>, <strong>, <em>. Mínimo 300 palabras.",
  "tag": "Oficial" o "Confirmado" o "Rumor" o "Industria" o "Trailer"
}\`;

const body = {
  contents: [{
    parts: [{
      text: promptText
    }]
  }],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 4096
  }
};

return [{
  json: {
    ...item.json,
    geminiBody: JSON.stringify(body)
  }
}];`
    },
    "id": "prepare-prompt",
    "name": "Preparar Prompt",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [1540, -100]
};

wf.nodes.push(sanitizerNode);

// 2. Update Gemini node to use the pre-built body
const geminiNode = wf.nodes.find(n => n.name === 'Gemini Reescribir');
if (geminiNode) {
    geminiNode.parameters.jsonBody = "={{ $json.geminiBody }}";
    geminiNode.position = [1760, -100];
    console.log('✅ Gemini Reescribir updated to use sanitized body');
}

// 3. Update connections:
// Generar Slug → Preparar Prompt → Gemini Reescribir
wf.connections['Generar Slug'] = {
    "main": [[{ "node": "Preparar Prompt", "type": "main", "index": 0 }]]
};
wf.connections['Preparar Prompt'] = {
    "main": [[{ "node": "Gemini Reescribir", "type": "main", "index": 0 }]]
};
// Gemini → Formatear should already exist, but let's make sure
wf.connections['Gemini Reescribir'] = {
    "main": [[{ "node": "Formatear Artículo", "type": "main", "index": 0 }]]
};

fs.writeFileSync(filename, JSON.stringify(wf, null, 4));

// Verify chain
const v = JSON.parse(fs.readFileSync(filename, 'utf8'));
const chain = [];
let cur = '¿Hay noticias?';
for (let i = 0; i < 10; i++) {
    const next = v.connections[cur]?.main?.[0]?.[0]?.node;
    if (!next) break;
    chain.push(next);
    cur = next;
}
console.log('\nFull chain: ¿Hay noticias? →', chain.join(' → '));
console.log('\n✅ Done! Reimport n8n-gta6-news-workflow.json');
