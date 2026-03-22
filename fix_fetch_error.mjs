import fs from 'fs';

// ===== FIX ARTICLES WORKFLOW =====
function fixArticles() {
    const filename = 'n8n-gta6-ai-articles-workflow.json';
    const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

    // Remove the broken "Verificar Duplicado" code node that used fetch
    wf.nodes = wf.nodes.filter(n => n.name !== 'Verificar Duplicado');
    delete wf.connections['Verificar Duplicado'];

    // Add HTTP Request node to check for duplicates (this always works in n8n)
    const httpCheckNode = {
        "parameters": {
            "method": "GET",
            "url": "=https://qbuahhhrzbkqftuxixrw.supabase.co/rest/v1/articles?slug=eq.{{ $json.slug }}&select=id",
            "sendHeaders": true,
            "headerParameters": {
                "parameters": [
                    {
                        "name": "apikey",
                        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E"
                    },
                    {
                        "name": "Authorization",
                        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E"
                    }
                ]
            },
            "options": {}
        },
        "id": "check-duplicate",
        "name": "Comprobar Duplicado",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "alwaysOutputData": true,
        "position": [880, 0]
    };

    // Add Code node that properly decides based on HTTP response
    const decideNode = {
        "parameters": {
            "jsCode": `// Get the HTTP response from the duplicate check
const checkResult = $input.all();

// Get original article data from Formatear Artículo
const article = $('Formatear Artículo').first().json;

// Check if Supabase returned any matching articles
// When the HTTP Request returns [] (empty array), n8n with alwaysOutputData 
// gives us an item WITHOUT an 'id' property.
// When it returns [{"id": X}], the item HAS an 'id' property.
const firstItem = checkResult[0]?.json;
const hasId = firstItem && firstItem.id !== undefined && firstItem.id !== null;

if (hasId) {
  // Duplicate found - article with this slug already exists
  // Return empty to stop the flow
  return [];
}

// Article is new - pass through article data for insertion
return [{ json: article }];`
        },
        "id": "decide-new",
        "name": "Decidir si es Nuevo",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [1100, 0]
    };

    wf.nodes.push(httpCheckNode);
    wf.nodes.push(decideNode);

    // Update connections
    wf.connections['Formatear Artículo'] = {
        "main": [[{ "node": "Comprobar Duplicado", "type": "main", "index": 0 }]]
    };
    wf.connections['Comprobar Duplicado'] = {
        "main": [[{ "node": "Decidir si es Nuevo", "type": "main", "index": 0 }]]
    };
    wf.connections['Decidir si es Nuevo'] = {
        "main": [[{ "node": "Publicar en Supabase", "type": "main", "index": 0 }]]
    };

    // Make sure Publicar uses $json directly
    const publishNode = wf.nodes.find(n => n.name === 'Publicar en Supabase');
    if (publishNode) {
        publishNode.parameters.jsonBody = "={{ JSON.stringify($json) }}";
    }

    fs.writeFileSync(filename, JSON.stringify(wf, null, 4));
    console.log('✅ Articles workflow fixed');

    // Verify chain
    const v = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const chain = [];
    let cur = 'Cada dia a las 10h';
    for (let i = 0; i < 10; i++) {
        const next = v.connections[cur]?.main?.[0]?.[0]?.node;
        if (!next) break;
        chain.push(`${cur} → ${next}`);
        cur = next;
    }
    console.log('   Chain:', chain.map(c => c.split(' → ')[1]).join(' → '));
}

// ===== FIX NEWS WORKFLOW =====
function fixNews() {
    const filename = 'n8n-gta6-news-workflow.json';
    const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

    // Remove the broken "Verificar Duplicado" that used fetch
    wf.nodes = wf.nodes.filter(n => n.name !== 'Verificar Duplicado');
    delete wf.connections['Verificar Duplicado'];

    // Add HTTP Request node
    const httpCheckNode = {
        "parameters": {
            "method": "GET",
            "url": "=https://qbuahhhrzbkqftuxixrw.supabase.co/rest/v1/articles?slug=eq.{{ $('Generar Slug').first().json.slug }}&select=id",
            "sendHeaders": true,
            "headerParameters": {
                "parameters": [
                    {
                        "name": "apikey",
                        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E"
                    },
                    {
                        "name": "Authorization",
                        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5MDY2NSwiZXhwIjoyMDg2NjY2NjY1fQ.Szvta0eXS-E11MYvS-uX8GdRGE3NrerY2WYyH8vJM5E"
                    }
                ]
            },
            "options": {}
        },
        "id": "check-duplicate-news",
        "name": "Comprobar Duplicado",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "alwaysOutputData": true,
        "position": [2200, -100]
    };

    // Add Code node
    const decideNode = {
        "parameters": {
            "jsCode": `const checkResult = $input.all();
const article = $('Formatear Artículo').first().json;

const firstItem = checkResult[0]?.json;
const hasId = firstItem && firstItem.id !== undefined && firstItem.id !== null;

if (hasId) {
  return [];
}

return [{ json: article }];`
        },
        "id": "decide-new-news",
        "name": "Decidir si es Nuevo",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [2420, -100]
    };

    wf.nodes.push(httpCheckNode);
    wf.nodes.push(decideNode);

    // Move Publicar further right
    const publishNode = wf.nodes.find(n => n.name === 'Publicar en Supabase');
    if (publishNode) {
        publishNode.position = [2640, -100];
        publishNode.parameters.jsonBody = "={{ JSON.stringify($json) }}";
    }

    // Update connections
    wf.connections['Formatear Artículo'] = {
        "main": [[{ "node": "Comprobar Duplicado", "type": "main", "index": 0 }]]
    };
    wf.connections['Comprobar Duplicado'] = {
        "main": [[{ "node": "Decidir si es Nuevo", "type": "main", "index": 0 }]]
    };
    wf.connections['Decidir si es Nuevo'] = {
        "main": [[{ "node": "Publicar en Supabase", "type": "main", "index": 0 }]]
    };

    fs.writeFileSync(filename, JSON.stringify(wf, null, 4));
    console.log('✅ News workflow fixed');

    const v = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const chain = [];
    let cur = '¿Hay noticias?';
    for (let i = 0; i < 10; i++) {
        const next = v.connections[cur]?.main?.[0]?.[0]?.node;
        if (!next) break;
        chain.push(next);
        cur = next;
    }
    console.log('   Chain: ¿Hay noticias? →', chain.join(' → '));
}

console.log('=== Fixing fetch error - using HTTP Request nodes instead ===\n');
fixArticles();
console.log('');
fixNews();
console.log('\n=== Done! Reimport both JSONs in n8n ===');
