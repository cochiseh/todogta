import fs from 'fs';

const filename = 'n8n-gta6-news-workflow.json';
const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

// Remove old "Comprobar Duplicado" and "¿Es nuevo?" nodes
wf.nodes = wf.nodes.filter(n => n.name !== 'Comprobar Duplicado' && n.name !== '¿Es nuevo?');
delete wf.connections['Comprobar Duplicado'];
delete wf.connections['¿Es nuevo?'];

// Add robust Code node that checks and decides
const checkNode = {
    "parameters": {
        "jsCode": `// Get the article data from previous node
const article = $input.first().json;
const slug = article.slug;

// Check if this slug already exists in Supabase
const response = await fetch(
  \`https://qbuahhhrzbkqftuxixrw.supabase.co/rest/v1/articles?slug=eq.\${encodeURIComponent(slug)}&select=id\`,
  {
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E'
    }
  }
);

const existing = await response.json();

if (existing.length > 0) {
  // Duplicate found - skip
  return [];
}

// Article is new - pass through
return [{ json: article }];`
    },
    "id": "check-and-decide",
    "name": "Verificar Duplicado",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [
        2200,
        -100
    ]
};

wf.nodes.push(checkNode);

// Move "Publicar en Supabase" node further right
const publishNode = wf.nodes.find(n => n.name === 'Publicar en Supabase');
if (publishNode) {
    publishNode.position = [2420, -100];
    publishNode.parameters.jsonBody = "={{ JSON.stringify($json) }}";
}

// Update connections: 
// Generar Slug → Gemini Reescribir (already existing, through the old ¿Es nuevo? → but now we need to fix)
// Wait, let me check the flow:
// Generar Slug → (old: Comprobar Duplicado → ¿Es nuevo? → Gemini) 
// We want: Generar Slug → Gemini Reescribir → Formatear Artículo → Verificar Duplicado → Publicar

// Fix: Generar Slug should go directly to Gemini Reescribir now
wf.connections['Generar Slug'] = {
    "main": [
        [
            {
                "node": "Gemini Reescribir",
                "type": "main",
                "index": 0
            }
        ]
    ]
};

wf.connections['Formatear Artículo'] = {
    "main": [
        [
            {
                "node": "Verificar Duplicado",
                "type": "main",
                "index": 0
            }
        ]
    ]
};

wf.connections['Verificar Duplicado'] = {
    "main": [
        [
            {
                "node": "Publicar en Supabase",
                "type": "main",
                "index": 0
            }
        ]
    ]
};

fs.writeFileSync(filename, JSON.stringify(wf, null, 4));

// Verify the full chain
const verify = JSON.parse(fs.readFileSync(filename, 'utf8'));
const nodeNames = verify.nodes.map(n => n.name);
console.log('=== Fix News Workflow Duplicate Check ===');
console.log('Nodes:', nodeNames.join(' → '));
console.log(`Has old "Comprobar Duplicado": ${nodeNames.includes('Comprobar Duplicado') ? '❌ still there' : '✅ removed'}`);
console.log(`Has old "¿Es nuevo?": ${nodeNames.includes('¿Es nuevo?') ? '❌ still there' : '✅ removed'}`);
console.log(`Has new "Verificar Duplicado": ${nodeNames.includes('Verificar Duplicado') ? '✅' : '❌'}`);

// Check connection chain
const chain = [];
let current = '¿Hay noticias?';
while (current && verify.connections[current]) {
    const next = verify.connections[current]?.main?.[0]?.[0]?.node;
    if (next) {
        chain.push(`${current} → ${next}`);
        current = next;
    } else {
        break;
    }
}
console.log('\nFlow chain:');
chain.forEach(c => console.log(`  ${c}`));
console.log('\nDone!');
