# Turndown
[Turndown](https://github.com/mixmark-io/turndown#readme) 是一个用于将 HTML 转换为 Markdown 的 JavaScript 库。它适合用于 Node.js 环境或浏览器环境中，可以帮助开发者将复杂的 HTML 文档转换成易读的 Markdown 格式，方便于博客、文档和内容管理系统等应用场景。

以下是关于 Turndown 的一些关键点：

## 安装

```
npm install turndown
```

或
```
yarn add turndown
```

## 基本用法

```
const TurndownService = require('turndown')
const turndownService = new TurndownService()

const html = '<h1>Hello World</h1>'
const markdown = turndownService.turndown(html)

console.log(markdown)  // # Hello World
```

## 配置选项

Turndown 可以通过配置选项来定制转换规则。例如，可以设置选项来控制不同 HTML 元素如何转换为 Markdown。

```
const turndownService = new TurndownService({
  headingStyle: 'atx',  // 使用 'atx' 样式的标题（'setext' 为另一种样式）
  bulletListMarker: '-',  // 使用 '-' 作为无序列表的标记符（可以是 '*', '+'）
})
```

## 自定义规则

你也可以定义自己的规则来处理特定的 HTML 标签。这里是一个示例，示范如何将特定标签转换为自定义的 Markdown 格式：

```
turndownService.addRule('myCustomRule', {
  filter: 'div',  // 过滤特定标签，比如这里是 'div'
  replacement: function (content, node, options) {
    return `**${content}**`  // 将 <div> 标签内容转换为粗体
  }
})
```

## 插件支持

Turndown 还支持插件，可以扩展其功能。例如，你可以使用 turndown-plugin-gfm 插件来支持 GitHub 风格的 Markdown 语法：
```
const turndownPluginGfm = require('turndown-plugin-gfm');
turndownService.use(turndownPluginGfm.gfm);
```

## demo
- [简单例子将 html 转换为 markdown](./index.js)
- [使用插件处理表格](./demos/table/index.js)  
    使用了“[joplin-turndown-plugin-gfm](https://github.com/laurent22/joplin-turndown-plugin-gfm)”插件代替“[turndown-plugin-gfm](https://github.com/mixmark-io/turndown-plugin-gfm)”，前者可以支持无 thead 的表格