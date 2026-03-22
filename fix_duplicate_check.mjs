import fs from 'fs';

const filename = 'n8n-gta6-ai-articles-workflow.json';
const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

// ============================================================
// FIX 1: Replace the "Comprobar Duplicado" + "¿Es nuevo?" chain
// with a single robust Code node that checks AND decides.
// ============================================================

// Remove old "Comprobar Duplicado" and "¿Es nuevo?" nodes
wf.nodes = wf.nodes.filter(n => n.name !== 'Comprobar Duplicado' && n.name !== '¿Es nuevo?');

// Remove old connections from these nodes
delete wf.connections['Comprobar Duplicado'];
delete wf.connections['¿Es nuevo?'];

// Add a new Code node that does the duplicate check internally via fetch
const checkAndDecideNode = {
    "parameters": {
        "jsCode": `// Get the article data from previous node
const article = $('Formatear Artículo').first().json;
const slug = article.slug;

// Check if the slug already exists in Supabase
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
  // Article with this slug already exists - skip
  return []; // No output = stops the flow
}

// Article is new - pass through all data for insertion
return [{ json: article }];`
    },
    "id": "check-and-decide",
    "name": "Verificar Duplicado",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [
        880,
        0
    ]
};

wf.nodes.push(checkAndDecideNode);

// Update connections:
// Formatear Artículo → Verificar Duplicado → Publicar en Supabase
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

// Also update "Publicar en Supabase" to use the data directly from the code node
const publishNode = wf.nodes.find(n => n.name === 'Publicar en Supabase');
if (publishNode) {
    publishNode.parameters.jsonBody = "={{ JSON.stringify($json) }}";
}

fs.writeFileSync(filename, JSON.stringify(wf, null, 4));

// Verify
const verify = JSON.parse(fs.readFileSync(filename, 'utf8'));
const hasOldDuplicate = verify.nodes.some(n => n.name === 'Comprobar Duplicado');
const hasOldIsNew = verify.nodes.some(n => n.name === '¿Es nuevo?');
const hasNewNode = verify.nodes.some(n => n.name === 'Verificar Duplicado');
const formatConn = verify.connections['Formatear Artículo']?.main?.[0]?.[0]?.node;
const checkConn = verify.connections['Verificar Duplicado']?.main?.[0]?.[0]?.node;

console.log('=== Fix Articles Workflow ===');
console.log(`Old "Comprobar Duplicado" removed: ${!hasOldDuplicate ? '✅' : '❌'}`);
console.log(`Old "¿Es nuevo?" removed: ${!hasOldIsNew ? '✅' : '❌'}`);
console.log(`New "Verificar Duplicado" added: ${hasNewNode ? '✅' : '❌'}`);
console.log(`Formatear Artículo → ${formatConn} ${formatConn === 'Verificar Duplicado' ? '✅' : '❌'}`);
console.log(`Verificar Duplicado → ${checkConn} ${checkConn === 'Publicar en Supabase' ? '✅' : '❌'}`);
console.log('\nDone! Re-import n8n-gta6-ai-articles-workflow.json into n8n.');
