const fs = require('fs');
const { parse } = require('node-html-parser');
const markdown = require('markdown-it')();


function main() {
    // 读取下载的 HTML 文件
    const html = fs.readFileSync('medium.html', 'utf8');

    // 使用 node-html-parser 解析 HTML
    const root = parse(html);

    // 定义一个函数来提取主要内容
    function extractMainContent(element) {
        // 这里可以是你自定义的逻辑，用来判断和提取主要内容
        // 例如可以根据标签、类名、ID等特征来定位主要内容
        return element.querySelector('#root') || element; // 示例：假设主要内容在一个类为main-content的元素中
    }

    // 提取并转换主要内容为 Markdown
    const mainContentElement = extractMainContent(root);
    const mainContentHTML = mainContentElement.toString();

    const markdownContent = markdown.render(mainContentHTML);

    // 将 Markdown 内容写入新文件
    fs.writeFileSync('output.md', markdownContent, 'utf8');

    console.log('转换完成！');
}

main()

