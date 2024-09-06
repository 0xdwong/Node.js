require('dotenv').config();
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);

async function checkBalance(address) {
    let lastBalance = ethers.BigNumber.from('0');

    setInterval(async () => {
        const currentBalance = await provider.getBalance(address);
        if (!currentBalance.eq(lastBalance)) {
            console.log(`Balance updated: ${ethers.utils.formatEther(currentBalance)} ETH`);
            lastBalance = currentBalance;
        }
    }, 1 * 1000); // 每分钟检查一次
}

async function main() {
    const address = '';
    await checkBalance(address);
}

main();