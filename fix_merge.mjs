import fs from 'fs';

const filename = 'n8n-gta6-news-workflow.json';
const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

// Remove the "Unir Feeds" (Merge) node - it's broken with 3 inputs
wf.nodes = wf.nodes.filter(n => n.name !== 'Unir Feeds');

// Remove old connections FROM the Merge node
delete wf.connections['Unir Feeds'];

// Update RSS connections to go directly to "Filtrar GTA 6" instead of "Unir Feeds"
for (const feedName of ['RSS Eurogamer', 'RSS GameSpot', 'RSS Kotaku']) {
    if (wf.connections[feedName]) {
        wf.connections[feedName] = {
            "main": [
                [
                    {
                        "node": "Filtrar GTA 6",
                        "type": "main",
                        "index": 0
                    }
                ]
            ]
        };
    }
}

fs.writeFileSync(filename, JSON.stringify(wf, null, 4));

// Verify
const verify = JSON.parse(fs.readFileSync(filename, 'utf8'));
const hasMerge = verify.nodes.some(n => n.name === 'Unir Feeds');
const eurogamerTarget = verify.connections['RSS Eurogamer']?.main?.[0]?.[0]?.node;
const gameSpotTarget = verify.connections['RSS GameSpot']?.main?.[0]?.[0]?.node;
const kotakuTarget = verify.connections['RSS Kotaku']?.main?.[0]?.[0]?.node;

console.log('=== Fix News Workflow Merge ===');
console.log(`Merge node removed: ${!hasMerge ? '✅' : '❌'}`);
console.log(`RSS Eurogamer → ${eurogamerTarget} ${eurogamerTarget === 'Filtrar GTA 6' ? '✅' : '❌'}`);
console.log(`RSS GameSpot  → ${gameSpotTarget} ${gameSpotTarget === 'Filtrar GTA 6' ? '✅' : '❌'}`);
console.log(`RSS Kotaku    → ${kotakuTarget} ${kotakuTarget === 'Filtrar GTA 6' ? '✅' : '❌'}`);
console.log('\nDone! Re-import n8n-gta6-news-workflow.json into n8n.');
