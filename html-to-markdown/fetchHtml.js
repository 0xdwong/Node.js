const fs = require('fs');

const puppeteer = require('puppeteer');


async function fetchHtmlContent(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // 等待页面加载完成
    // await page.waitForNavigation({timeout: 3000}); // 等待3秒，或者使用其他适当的等待方法

    const htmlContent = await page.content();
    // console.log(htmlContent); // 完整的客户端渲染后的页面内容
    fs.writeFileSync('source.html', htmlContent);

    await browser.close();
    return htmlContent;
}

module.exports = {
    fetchHtmlContent,
}