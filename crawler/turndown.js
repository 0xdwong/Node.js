const TurndownService = require('turndown');
const turndownService = new TurndownService();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fs = require('fs');


function main() {
    let html = fs.readFileSync('medium.html');

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const article = document.querySelector('article');
    if (!article) {
        console.warn('====no article====');
        return;
    }

    const filteredContent = Array.from(article.querySelectorAll('div:not(.speechify-ignore)')).map(element => element.outerHTML).join('');
    // const filteredContent = Array.from(article.querySelectorAll('.speechify-ignore')).map(element => element.outerHTML).join('');
    // 仅排除第一个符合条件的元素
    // const filteredContent = Array.from(article.children).map((child, index) => {
    //     if (child.classList.contains('speechify-ignore')) {
    //         console.log('====================');
    //         return '';
    //     }
    //     return child.outerHTML;
    // }).join('');


    // 将 HTML 文档转换为 Markdown
    const markdownContent = turndownService.turndown(filteredContent);

    fs.writeFileSync('turndown2.md', markdownContent);
}

main();