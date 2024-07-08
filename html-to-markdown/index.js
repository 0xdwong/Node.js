const TurndownService = require('turndown');
const turndownService = new TurndownService({
    headingStyle: 'atx', // #形式的标题
});

const { Readability } = require('@mozilla/readability');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fs = require('fs');
const { fetchHtmlContent } = require('./fetchHtml');


const url = 'https://medium.com/movementlabsxyz/the-movevm-a-new-era-of-blockchain-precision-and-safety-a1b5bd4a65ea';

async function htmlToMarkdown() {
    return fetchAndHandle(url); // || convertByReader();
}

async function fetchAndHandle(url) {
    const html = await fetchHtmlContent(url)

    const dom = new JSDOM(html);

    const document = dom.window.document;

    let traget = document;
    if (url.includes('https://medium.com/')) {
        const article = document.querySelector('article');
        if (article) {
            const nodes = article.querySelectorAll('.speechify-ignore');
            nodes.forEach(node => {
                node.remove();
            });
            traget = article;
        }
    }

    // 将 HTML 文档转换为 Markdown
    const markdownContent = turndownService.turndown(traget);

    fs.writeFileSync('target.md', markdownContent);
    return markdownContent;
}


async function convertByReader(url) {
    // 不显示图片
    const dom = await JSDOM.fromURL(url);
    const reader = new Readability(dom.window.document);
    const contentHtml = (reader.parse()).content;
    const markdownContent = turndownService.turndown(contentHtml);

    fs.writeFileSync('target.md', markdownContent);

    return markdownContent;
}

module.exports = {
    htmlToMarkdown,
}