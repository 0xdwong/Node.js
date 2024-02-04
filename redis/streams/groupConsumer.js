const Redis = require('ioredis');
const redis = new Redis();

async function start() {
    // 创建一个名为 'mygroup' 的消费组 其开始读取的位置为 '0-0'，这表示从stream的开始读取。
    const groupName = 'mygroup';
    const consumerName = 'consumer1';
    const msgStream = 'mystream';
    
    // 已创建消费组可略过
    await redis.xgroup('CREATE', msgStream, groupName, '0-0', 'MKSTREAM');

    // The special > ID, which means that the consumer want to receive only messages that were never delivered to any other consumer. It just means, give me new messages.
    while (true) {
        // 使用阻塞的方式读取 stream 的新数据。
        // 这将会停在这// 直到有新的数据添加到 stream。
        const result = await redis.xreadgroup(
            'GROUP',
            groupName,
            consumerName,
            'BLOCK',
            0,
            'STREAMS',
            msgStream,
            '>' //receive only messages that were never delivered to any other consumer
        );
        
        if(result[0][1].length === 0) continue;

        const data = result[0][1][0][1][1];
        console.log(`${consumerName} Received data: ${JSON.stringify(data)}`);

        // 完成工作的处理后，使用 XACK 来确认消息的接收。
        const id = result[0][1][0][0];
        await redis.xack(msgStream, groupName, id);
    }
}

start().catch(error => console.error(error));
