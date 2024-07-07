const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const TurndownService = require('turndown');
const { Readability } = require('@mozilla/readability')


async function main() {
    const turndownService = new TurndownService({
        headingStyle: 'atx', // #形式的标题
    });

    let content = '';
    let title = '';
    try {

        const options = { pretendToBeVisual: true }
        // const dom1 = await JSDOM.fromFile("medium.html", options);
        // const html1 = dom1.serialize();
        // fs.writeFileSync('medium2.html', html1);


        const html = fs.readFileSync('medium.html');

        const dom = new JSDOM(html, options);

        // 阅读模式下，帮助提取网页正文内容并过滤掉其他的非主要元素
        const reader = new Readability(dom.window.document);
        const article = reader.parse();

        title = article.title;
        const contentHtml = article.content;

        // html -> markdown
        content = turndownService.turndown(contentHtml); // 使用turndown将HTML内容转换为Markdown
    } catch (err) {
        logger.error('covertURLToMD failed', err);
    }

    fs.writeFileSync(`${title}.md`, content);
    console.log({ title, content })
    return { title, content };
}


main();