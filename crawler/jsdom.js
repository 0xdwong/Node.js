const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
const { Readability } = require('@mozilla/readability')

function main() {
    let html = `<body>
        <div id="content"></div>
        <script>document.getElementById("content").append(document.createElement("hr"));</script>
      </body>`;

    html = fs.readFileSync('medium.html');

    const dom = new JSDOM(html);

    console.log(dom);

}


async function _loadByByReader() {
    const turndownService = new TurndownService({
        headingStyle: 'atx', // #形式的标题
    });

    let content = '';
    let title = '';
    try {
        const html = fs.readFileSync('medium.html');

        const dom = new JSDOM(html);

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

    return { title, content };
}


main();