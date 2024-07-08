const TurndownService = require('turndown');
const turndownService = new TurndownService({
    headingStyle: 'atx', // #形式的标题
});

const { Readability } = require('@mozilla/readability');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fs = require('fs');


async function main() {
    const url = 'https://medium.com/movementlabsxyz/the-movevm-a-new-era-of-blockchain-precision-and-safety-a1b5bd4a65ea';

    let html = fs.readFileSync('medium.html');

    const dom = new JSDOM(html);

    // // 使用JSDOM获取网页内容
    // const dom = await JSDOM.fromURL(url);

    const document = dom.window.document;

    const article = document.querySelector('article');
    if (!article) {
        console.warn('====no article====');
        return;
    }

    const nodes = article.querySelectorAll('.speechify-ignore');
    nodes.forEach(node => {
        node.remove();
    });


    // // 将 HTML 文档转换为 Markdown
    const markdownContent = turndownService.turndown(article);

    fs.writeFileSync('turndown.md', markdownContent);

    // {
    //     const dom = await JSDOM.fromURL(url);
    //     const reader = new Readability(dom.window.document);
    //     const contentHtml = (reader.parse()).content;
    //     content = turndownService.turndown(contentHtml);
    //     fs.writeFileSync('readability.md', content);
    // }

}

main();