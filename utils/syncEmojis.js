const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// A reliable recursive directory walker
function getAllJsFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Ignore node_modules, .git, and the python 'bot' folder
            if (!['node_modules', '.git', 'bot', 'scratch'].includes(file)) {
                getAllJsFiles(fullPath, fileList);
            }
        } else if (fullPath.endsWith('.js')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

module.exports = async (client) => {
    // 1. Check if disabled via ENV
    if (process.env.EMOJI_SYNC === 'false') {
        console.log('◈ EmojiSync: Disabled via .env');
        return;
    }

    console.log('★ Application Emoji Sync: Scanning codebase...');

    const rootDir = process.cwd();
    const allFiles = getAllJsFiles(rootDir);
    const regex = /<(a?):([a-zA-Z0-9_]+):(\d+)>/g;

    // Track all unique emojis found in code
    // format: { "name": { id: "123", animated: true, str: "<:name:123>" } }
    const codeEmojis = new Map();

    for (const file of allFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        let match;
        while ((match = regex.exec(content)) !== null) {
            const animated = match[1] === 'a';
            const name = match[2];
            const id = match[3];
            const str = match[0];
            
            // Just map them by old ID to avoid name collisions if multiple have same name
            codeEmojis.set(id, { name, id, animated, str });
        }
    }

    if (codeEmojis.size === 0) {
        console.log('◈ EmojiSync: No custom emojis found in code.');
        return;
    }

    console.log(`◈ EmojiSync: Found ${codeEmojis.size} unique custom emojis in the source code.`);

    const token = client.token;
    const appId = client.user.id;

    // 2. Fetch existing Application Emojis
    const headers = {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
    };

    let appEmojis = [];
    try {
        const res = await fetch(`https://discord.com/api/v10/applications/${appId}/emojis`, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        appEmojis = data.items || data || [];
    } catch (e) {
        console.error('✖ EmojiSync: Failed to fetch application emojis', e.message);
        return;
    }

    let updatedFiles = false;
    let uploaded = 0;
    let fixed = 0;
    let skipped = 0;
    let failed = 0;

    // We will build a replacement map: old_id -> new_id
    const replacements = new Map();

    for (const [oldId, emojiData] of codeEmojis.entries()) {
        const existing = appEmojis.find(e => e.id === oldId || e.name === emojiData.name);

        if (existing) {
            if (oldId !== existing.id) {
                // ID mismatch, needs fixing
                replacements.set(oldId, existing.id);
                fixed++;
                console.log(`↻ EmojiSync: Auto-fixing ID for ${emojiData.name} -> ${existing.id}`);
            } else {
                skipped++;
            }
            continue;
        }

        // 3. Upload missing emoji
        console.log(`◈ EmojiSync: Uploading ${emojiData.name} (not found in application)`);
        const ext = emojiData.animated ? 'gif' : 'webp';
        const imgUrl = `https://cdn.discordapp.com/emojis/${oldId}.${ext}`;
        
        try {
            const imgRes = await fetch(imgUrl);
            if (!imgRes.ok) throw new Error('Image not found');
            const arrayBuffer = await imgRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');
            const mime = emojiData.animated ? 'image/gif' : 'image/webp';
            const uri = `data:${mime};base64,${base64}`;

            const postRes = await fetch(`https://discord.com/api/v10/applications/${appId}/emojis`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ name: emojiData.name, image: uri })
            });

            if (postRes.ok) {
                const newEmoji = await postRes.json();
                appEmojis.push(newEmoji);
                replacements.set(oldId, newEmoji.id);
                uploaded++;
                console.log(`✔ EmojiSync: Successfully uploaded ${emojiData.name} [New ID: ${newEmoji.id}]`);
            } else {
                failed++;
                console.error(`✖ EmojiSync: Discord rejected ${emojiData.name}`, await postRes.text());
            }

            // Sleep to avoid rate limits
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
            failed++;
            console.error(`✖ EmojiSync: Failed to process ${emojiData.name}:`, e.message);
        }
    }

    // 4. Patch Files if replacements exist
    if (replacements.size > 0) {
        for (const file of allFiles) {
            let content = fs.readFileSync(file, 'utf-8');
            let fileChanged = false;

            for (const [oldId, newId] of replacements.entries()) {
                const eData = codeEmojis.get(oldId);
                const oldStr = `<${eData.animated ? 'a' : ''}:${eData.name}:${oldId}>`;
                
                // We need to fetch the true name of the newly matched emoji from the appEmojis list
                // just in case they renamed it slightly.
                const newEmojiData = appEmojis.find(e => e.id === newId);
                const newStr = `<${eData.animated ? 'a' : ''}:${newEmojiData ? newEmojiData.name : eData.name}:${newId}>`;

                if (content.includes(oldStr)) {
                    content = content.split(oldStr).join(newStr);
                    fileChanged = true;
                }
            }

            if (fileChanged) {
                fs.writeFileSync(file, content, 'utf-8');
                updatedFiles = true;
            }
        }
    }

    console.log(`★ EmojiSync Complete: ${skipped} matching | ${fixed} fixed | ${uploaded} uploaded | ${failed} failed`);

    // 5. Auto Restart
    if (updatedFiles) {
        console.log('★ EmojiSync: Source code was patched. Auto-restarting bot...');
        const child = spawn(process.argv[0], process.argv.slice(1), {
            detached: true,
            stdio: 'inherit'
        });
        child.unref();
        process.exit(0);
    }
};
