import fs from 'fs';

async function uploadToCatbox(filePath) {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    const buffer = fs.readFileSync(filePath);
    const blob = new Blob([buffer], { type: 'image/png' });
    form.append('fileToUpload', blob, 'image.png');

    try {
        const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return await res.text();
    } catch (err) {
        console.error('Upload error for', filePath, ':', err.message);
        return null;
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    console.log('Uploading economy...');
    const econUrl = await uploadToCatbox('public/images/gta6_economy.png');
    console.log('ECONURL:', econUrl);
    await sleep(3000);

    console.log('Uploading police...');
    const policeUrl = await uploadToCatbox('public/images/gta6_police.png');
    console.log('POLICEURL:', policeUrl);
    await sleep(3000);

    console.log('Uploading map...');
    const mapUrl = await uploadToCatbox('public/images/gta6_leonida_map.png');
    console.log('MAPURL:', mapUrl);

    fs.writeFileSync('catbox_urls.json', JSON.stringify({ econUrl, policeUrl, mapUrl }, null, 2));
}

run();
