import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('pool_urls.json', 'utf8'));

// Format the pool as a JS array string
const poolStr = JSON.stringify(urls, null, 2);

const replacementCode = `
const imagePool = ${poolStr};
const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];
`;

function processWorkflow(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File ${filename} not found.`);
        return;
    }
    const wf = JSON.parse(fs.readFileSync(filename, 'utf8'));

    // Find the formatting node
    const formatNode = wf.nodes.find(n => n.name === 'Formatear Artículo');
    if (formatNode && formatNode.parameters && formatNode.parameters.jsCode) {
        let code = formatNode.parameters.jsCode;

        // 1. Inject pool definition right before 'return [{'
        if (!code.includes('const imagePool =')) {
            code = code.replace("return [{", replacementCode + "\nreturn [{");
        }

        // 2. Replace the old image generation line safely
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('image: `https://image.pollinations.ai')) {
                // Preserve leading whitespace formatting
                const match = lines[i].match(/^\s*/);
                const indent = match ? match[0] : '';
                lines[i] = indent + "image: randomImage,";
                break;
            }
        }
        code = lines.join('\n');

        formatNode.parameters.jsCode = code;
        fs.writeFileSync(filename, JSON.stringify(wf, null, 4));
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Could not find target node in ${filename}`);
    }
}

processWorkflow('n8n-gta6-ai-articles-workflow.json');
processWorkflow('n8n-gta6-news-workflow.json');
