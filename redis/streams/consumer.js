const Redis = require('ioredis');
const redis = new Redis();

async function start() {
    const msgStream = 'mystream';

    while (true) {
        // $ 表示特殊的ID，仅获取新内容；0 0 获取所有消息
        const result = await redis.xread("count", 1, "block", 0, "STREAMS", msgStream, '$');
        console.log(JSON.stringify(result));
    }
}

start().catch(error => console.error(error));
