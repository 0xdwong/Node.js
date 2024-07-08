const { htmlToMarkdown } = require('./index');

async function main() {
    let url = 'https://medium.com/movementlabsxyz/the-movevm-a-new-era-of-blockchain-precision-and-safety-a1b5bd4a65ea';
    await htmlToMarkdown(url);
}

main();