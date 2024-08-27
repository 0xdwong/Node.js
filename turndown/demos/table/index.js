const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const turndownPluginGfm = require('joplin-turndown-plugin-gfm');

const turndownService = new TurndownService({
    headingStyle: 'atx', // #形式的标题
});

const gfm = turndownPluginGfm.gfm;
const tables = turndownPluginGfm.tables;
const strikethrough = turndownPluginGfm.strikethrough;

// Use the gfm plugin
turndownService.use(gfm)

// Use the table and strikethrough plugins only
turndownService.use([tables, strikethrough])


async function main() {
    let html = fs.readFileSync(path.join(__dirname, 'input.html')).toString();

    // 将 HTML 文档转换为 Markdown
    const markdownContent = turndownService.turndown(html);

    fs.writeFileSync(path.join(__dirname, 'output.md'), markdownContent);
}

main();