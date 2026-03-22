import fs from 'fs';

const wf = JSON.parse(fs.readFileSync('n8n-gta6-news-workflow.json', 'utf8'));
const filterNode = wf.nodes.find(n => n.name === 'Filtrar GTA 6');

if (filterNode) {
    const newCode = `const keywords = ['gta 6', 'gta6', 'gta vi', 'gtavi', 'grand theft auto vi', 'grand theft auto 6', 'rockstar games gta', 'vice city'];
const results = [];

for (const item of $input.all()) {
  const title = (item.json.title || '').toLowerCase();
  const desc = (item.json.contentSnippet || item.json.description || '').toLowerCase();
  const link = (item.json.link || '').toLowerCase();
  
  const match = keywords.some(kw => title.includes(kw) || desc.includes(kw) || link.includes(kw));
  if (match) {
    // Force the _empty property to false so the downstream 'If' node doesn't drop the item
    results.push({
      json: {
        ...item.json,
        _empty: false
      }
    });
  }
}

if (results.length === 0) {
  return [{ json: { _empty: true, message: 'No GTA 6 news found' } }];
}

return results;`;

    filterNode.parameters.jsCode = newCode;
    fs.writeFileSync('n8n-gta6-news-workflow.json', JSON.stringify(wf, null, 4));
    console.log('Successfully updated n8n-gta6-news-workflow.json');
} else {
    console.log('Could not find Filtrar GTA 6 node');
}
