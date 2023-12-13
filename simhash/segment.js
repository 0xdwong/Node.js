
const { cut } = require("nodejieba");

const Segment = require('segment');
const segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();


let str = '南京市长江大桥';
str = '区块链 Libra look like failed'


function main() {
    // segment
    const segmentResult = segment.doSegment(str, {
        simple: true
    });
    console.log('====segment====', segmentResult);

    //jieba
    const jiebaResult = cut(str);
    console.log('====jieba====', jiebaResult);
}

main()