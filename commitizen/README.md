# Commitizen

## 简介
Commitizen 是一个用于标准化提交消息的命令行工具。它通过提供一个交互式界面来引导用户撰写符合规范的提交消息，并且确保提交消息的一致性。

## 上手
1. 安装
    ```
    npm install -g commitizen
    ```

2. 初始化
    在项目中执行
    ```
    npm init --yes # 创建 package.json 文件
    
    # npm 
    commitizen init cz-conventional-changelog --save-dev --save-exact
    # or yarn
    commitizen init cz-conventional-changelog --yarn --dev --exact
    ```
3. 提交 commit  
    使用 `git cz`  代替 `git commit`。

    或者使用 npm 脚本，在 packages.json 里添加命令，并运行 `npm run commit`
    ```
    ...
    "scripts": {
      "commit": "cz"
    }
    ```
    
    接下来，它将会询问一系列问题，包括提交的类型、影响的范围、简要描述以及可选的长描述。Commitizen 将自动生成符合预定义格式的提交消息。


## 参考
- [commitizen GitHub](https://github.com/commitizen/cz-cli)
- [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)