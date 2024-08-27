const TurndownService = require('turndown');

const turndownService = new TurndownService({
    headingStyle: 'atx', // #形式的标题
});


const fs = require('fs');


async function main() {
    let html = fs.readFileSync('input.html').toString();

    // 将 HTML 文档转换为 Markdown
    const markdownContent = turndownService.turndown(html);

    fs.writeFileSync('output.md', markdownContent);
}

main();