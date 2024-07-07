const { PuppeteerWebBaseLoader } = require("@langchain/community/document_loaders/web/puppeteer");
const fs = require('fs');

const puppeteer = require('puppeteer');

const url = `https://medium.com/movementlabsxyz/the-movevm-a-new-era-of-blockchain-precision-and-safety-a1b5bd4a65ea`;
async function fun1() {
    /**
     * Loader uses `page.evaluate(() => document.body.innerHTML)`
     * as default evaluate function
     **/
    const loader = new PuppeteerWebBaseLoader(url);

    const docs = await loader.load();
    const document = docs[0].pageContent;
    console.log(document);
    fs.writeFileSync('xx.html', document);
}

async function fun2() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // 等待页面加载完成
    // await page.waitForNavigation({timeout: 3000}); // 等待3秒，或者使用其他适当的等待方法

    const htmlContent = await page.content();
    console.log(htmlContent); // 完整的客户端渲染后的页面内容
    fs.writeFileSync('medium.html', htmlContent);

    await browser.close();
}

async function main() {
    await fun2();
};

main();