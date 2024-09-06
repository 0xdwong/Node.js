const axios = require('axios');
const fs = require('fs');


async function getMediumArticleJson(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        // 移除前导无用字节
        let jsonResponse = response.data.replace("])}while(1);</x>", "");

        // 解析 JSON 数据
        let jsonData = JSON.parse(jsonResponse);

        console.log(jsonData);
        fs.writeFileSync('medium.json', jsonResponse);
    } catch (error) {
        console.error("Error fetching the Medium article:", error);
    }
}

let mediumArticleUrl = 'https://movementlabsxyz.medium.com/the-movevm-a-new-era-of-blockchain-precision-and-safety-a1b5bd4a65ea?format=json';
mediumArticleUrl = 'https://rareskills.medium.com/solidity-coding-standards-2cd5f32383fb?format=json'

getMediumArticleJson(mediumArticleUrl);