const Redis = require('ioredis');
const redis = new Redis();

setInterval(async () => {
    const playload = {
        timestamp: 1706498796838,
        data: Math.random().toString(36).substring(7), // 生成随机字符串
    }
    console.log(`Pushing data: ${JSON.stringify(playload)}`);
    await redis.xadd('mystream', '*', 'playload', JSON.stringify(playload));   //将数据推入到 'mystream'
    // await redis.xadd('mystream', 'MAXLEN', '~', 100, '*', 'playload', playload)
}, 1000);

