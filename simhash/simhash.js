// 载入模块
const Segment = require('novel-segment');
const fnv = require('fnv-plus');
const fs = require('fs');


const segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

// 停用词
const STOP_WORDS = genStopWords();

function createSimhash(keyword) {
    //1.对内容进行分词
    let result = segment.doSegment(keyword, {
        stripPunctuation: true,
        simple: true,
        // stripStopword: true,
        stripSpace: true,
    });


    // result = result.filter(ele => !STOP_WORDS.includes(ele.toLowerCase()));

    // console.log('====tokens====\n', result);
    console.log('====tokens====\n', JSON.stringify(result));


    // result = keyword;
    //2.用keyMap来存储分词及对应的权值
    const keyMap = new Map();

    //3.默认权值都是1,重复的权重在加1
    result.map(function (key) {
        if (keyMap.has(key)) {
            keyMap.set(key, keyMap.get(key) + 1);
        } else {
            keyMap.set(key, 1);
        }
    });

    const hashMap = new Map();
    keyMap.forEach(function (value, key, map) {
        let hash64 = fnv.hash(key, 64);

        //3.对每个key计算其hash值
        let currenthash = parseInt('0x' + hash64.hex()).toString(2).padStart(64, '0');

        //4.遍历hash值，对hash值进行权值操作
        for (let i = 0; i < currenthash.length; i++) {

            let v1 = parseInt(currenthash[i]);
            let v2;
            //根据计算规则遇到1则hash值和权值正相乘，遇到0则hash值和权值负相乘
            if (v1 > 0) {
                v2 = 1 * value;
            } else {
                v2 = value * (-1);
            }
            //5.边加权边合并
            if (hashMap.has(i)) {
                hashMap.set(i, hashMap.get(i) + v2);
            } else {
                hashMap.set(i, v2);
            }

        }
    });

    let s1 = '';
    //6.降维,归一化
    for (let i = 0; i < 64; i++) {
        let v1 = hashMap.get(i);
        if (v1 > 0) {
            hashMap.set(i, 1);
        } else {
            hashMap.set(i, 0);
        }
        s1 = s1 + hashMap.get(i);
    }

    return s1;
}

function genStopWords() {
    // const STOP_WORDS_TEXT = fs.readFileSync('cn_stopwords.txt').toString();
    const STOP_WORDS_TEXT = fs.readFileSync('baidu_stopwords.txt').toString();

    let stopWords = STOP_WORDS_TEXT.split('\n');
    stopWords = stopWords.map(ele => ele.trim());

    return stopWords;
}

function getDistance(hash1, hash2) {
    let length = hash1.length > hash2.length ? hash2.length : hash1.length;
    let distance = 0;
    for (let i = 0; i < length; i++) {
        if (hash1[i] !== hash2[i]) {
            distance = distance + 1;
        }
    }
    return distance;
}


function main() {
    let text1 = `hello world,here we came`;
    let text2 = `hello world,here I came`;

    text1 = `你妈妈喊你回家吃饭哦，回家罗回家罗`;
    text2 = `你妈妈叫你回家吃饭啦，回家罗回家罗`;

    text1 = `The quick brown fox jumps over the lazy dog.`
    text2 = `A quick brown fox jumps over the lazy dog.`
    // text2 = `The lazy dog is jumped over by a quick brown fox.`;

    // text1 = `我喜欢春天的温暖阳光和美丽花朵。`
    // text2 = `我喜欢春天温暖的阳光与美丽的花朵。`

    const hash1 = createSimhash(text1);
    const hash2 = createSimhash(text2);

    const distance = getDistance(hash1, hash2);

    console.log({ hash1, hash2, distance });

}

main();