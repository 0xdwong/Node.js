# Sentry

## 简介 
Sentry 是一个开源的错误监控平台，用于实时捕获、跟踪和报告应用程序中的异常和错误。它可以监控多种编程语言和框架，包括 Python、JavaScript、Java、Ruby 等，并提供直观的用户界面来查看和分析错误。


## Node.js 集成 Sentry
文档：https://docs.sentry.io/platforms/node

### 安装
```
yarn add @sentry/node
```

### 配置
```
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  tracesSampleRate: 1.0,
});
```

dsn 需要替换成自己的，可前往[官网](sentry.io)创建项目后获取。

### 测试
这段代码包含一个故意的错误，可以测试一切是否正常运行。

```
const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
```
登录 sentry.io 并打开对应项目，查看和解决记录的错误。

完整 demo 见：[app.js](./app.js)


