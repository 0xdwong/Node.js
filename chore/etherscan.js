const axios = require('axios');

const API_KEY = '';
const address = '';
const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`;

console.log(url)


async function getBalance() {
    try {
        const response = await axios.get(url);
        const balance = response.data.result;
        console.log(`Balance: ${balance} WEI`);
    } catch (error) {
        console.error('Error fetching balance:', error);

    }
}

getBalance();