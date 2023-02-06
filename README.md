# 📺 Anime Calendar

使用 [Wails](https://github.com/wailsapp/wails) 构建的新番提醒程序  
~~(此项目作为自己学习新语言的练习项目, 可能多少有不足, 谅解)~~

React 控件库: [Ant Design](https://ant.design/)

使用的 API: [Bangumi API](https://github.com/bangumi/api)  
API 文档: <https://bangumi.github.io/api/>

应用程序图标来自 [@Lusiro - iconfont](https://www.iconfont.cn/user/detail?uid=46101&nid=f13abJwF2nW9)

## Develop

依赖:

* [Go 1.18+](https://golang.org)
* [NPM (Node 15+)](https://nodejs.org)

克隆仓库后, 建议先运行 `go mod tidy` 检查 Golang 依赖

然后安装 Wails 命令行, 参考[这个](https://wails.io/zh-Hans/docs/gettingstarted/installation/)

关于 Golang 与前端之间的代码同步, 可以使用 wails 命令行运行

```bash
$ wails generate module
# or
$ wails dev
```

## LICENCE

程序依照 MIT 协议开源
