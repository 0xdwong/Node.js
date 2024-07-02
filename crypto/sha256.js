
const crypto = require('crypto');


function createHash(msg) {
    const hash = crypto.createHash('sha256').update(msg).digest('hex'); // 计算 SHA-256 哈希值并以十六进制格式显示

    console.log(`Sha256 hash of "${msg}" is: ${hash}`);

    return hash;
}

function findZerofrefix(n) {
    let image = '';
    let counter = 0;
    let prefix = Array(n).fill('0').join('');

    while (true) {
        let hash = createHash(String(counter));
        if (hash.startsWith(prefix)) {
            image = String(counter);
            break;
        }
        counter++;
    }

    console.log(`iamge:"${image}", hash: ${createHash(image)}`);
}


function main() {
    // createHash('Hello, world!'); // 对文本进行hash

    findZerofrefix(5);// 查找n个0开头的哈希原相
}

main()