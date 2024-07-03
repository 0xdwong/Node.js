# Pinata 
Pinata 是一个专为 Web3 和去中心化应用（dApps）设计的文件存储和管理平台。它主要使用分布式文件系统，如 IPFS（InterPlanetary File System），以便开发者能够更加方便、高效地存储和管理数字内容。

## 注册
在[这里](https://app.pinata.cloud/developers/keys)注册和获取 Key。免费用户能 pin 500 个文件，1G 存储容量。


## 简单上手
1. 安装 
```
npm install --save @pinata/sdk
```

2. 方法
- 上传文件到 IPFS `pinFileToIPFS`，参考 [demo](./pinJSON.js)
- 上传 JSON 数据到 IPFS `pinJSONToIPFS`，参考 [demo](./pinFile.js)
- pin IPFS 文件 `pinByHash`，参考 [demo](./pinFile.js)，需付费计划 Key 才使用

3. 预览
上传的文件可以通过网关查看，比如 `https://<your-gateway-domain>/ipfs/<IpfsHash>`


## 参考链接
- [pinata-sdk](https://docs.pinata.cloud/sdks/pinata-sdk)