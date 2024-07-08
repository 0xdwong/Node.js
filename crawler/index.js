const fs = require('fs');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const { JSDOM } = require("jsdom");


async function main() {
    const url = 'https://medium.com/movementlabsxyz/the-movevm-a-new-era-of-blockchain-precision-and-safety-a1b5bd4a65ea';

    let result;
    // result = await fetchByNodeFetch(url); // 抓取不到客户端渲染内容
    // result = await fetchByPuppeteer(url); // 太慢
    result = await fetchByJSDOM(url); // 图片缺失？


    fs.writeFileSync('source.html', result)
}


async function fetchByNodeFetch(url) {
    let res = await fetch(url);
    return res.text();
}

async function fetchByPuppeteer(url) {
    console.time('fetchByPuppeteer')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // 等待页面加载完成
    // await page.waitForNavigation({timeout: 3000}); // 等待3秒，或者使用其他适当的等待方法

    const htmlContent = await page.content();

    await browser.close();

    console.timeEnd('fetchByPuppeteer')
    return htmlContent;
}

async function fetchByJSDOM(url) {
    // 不显示图片
    const dom = await JSDOM.fromURL(url);
    const htmlContent = dom.serialize();

    return htmlContent;
}



main();